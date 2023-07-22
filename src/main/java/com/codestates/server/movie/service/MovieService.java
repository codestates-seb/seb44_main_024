package com.codestates.server.movie.service;

import com.codestates.server.api.service.ApiService;
import com.codestates.server.movie.entity.Movie;
import com.codestates.server.movie.scheduler.MovieScheduler;
import com.codestates.server.review.entity.Review;
import com.codestates.server.review.mapper.ReviewMapper;
import com.codestates.server.review.service.ReviewService;
import com.codestates.server.utils.MovieUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class MovieService {
    @Autowired
    ReviewService reviewService;
    @Autowired
    ReviewMapper reviewMapper;
    @Autowired
    MovieScheduler movieScheduler;
    @Autowired
    ApiService apiService;
    @Autowired
    MovieUtils movieUtils;
    @Autowired
    ObjectMapper objectMapper;

    public List<Object> getMovie(String docId, int page) throws IOException, ParseException {
        List<Object> result = new ArrayList<>();
        String json = apiService.getKMDbBydocId(docId);

        Movie movie = getMovieByResult(movieUtils.getResult(json).get(0));

        String id = searchTMDbId(movie);
        if (id != null && !id.isEmpty()) {
            searchTMDbImage(movie, id);
            searchTMDbVideo(movie, id);
        }

        Page<Review> reviewPage = reviewService.getReviewsByDocId(page, movie.getDocId());
        List<Review> reviews = reviewPage.getContent();

        movie.setReviewCount(reviews.size());
        movie.setReview(reviewMapper.reviewsToResponses(reviews));

        for (String genre : movie.getGenre().split(",|/")) {
            if (movieScheduler.getMainPage().get(genre + "score") != null) {
                result.add(getMovies(genre + "score").subList(0, 5));
                break;
            }
        }

        result.add(movie);
        result.add(reviewPage);

        return result;
    }

    public List<Movie> getMovies(String mapKey) {
        return getMoviesByResult(movieScheduler.getMainPage().get(mapKey).stream());
    }


    public List<Movie> searchKeyword(String keyword) throws IOException, ParseException {
        String json = apiService.getKMDbByQuery(keyword);

        return getMoviesByResult(movieUtils.getResult(json).stream());
    }

    private List<Movie> getMoviesByResult(Stream<String> stream) {
        return stream
                .map(i -> {
                    try {
                        Movie movie = objectMapper.readValue(i, Movie.class);
                        if (movie.getPosters().isEmpty()) {
                            searchTMDbId(movie);
                        }
                        movie.setScore(reviewService.getAverageScore(movie.getDocId()));
                        return movie;
                    } catch (JsonProcessingException e) {
                        throw new RuntimeException(e);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toList());
    }

    private Movie getMovieByResult(String str) {
        try {
            Movie movie = objectMapper.readValue(str, Movie.class);
            if (movie.getPosters().isEmpty()) {
                searchTMDbId(movie);
            }
            movie.setScore(reviewService.getAverageScore(movie.getDocId()));
            return movie;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    
    
    private String searchTMDbId(Movie movie) throws IOException {
        // TMDB에서 영화제목 검색하여 영화 ID와 Poster 가져오기
        String repRlsDate = movie.getRepRlsDate().length() > 4 ? movie.getRepRlsDate().substring(0, 4) : movie.getRepRlsDate();

        String id = "";
        JsonNode tmdbId;


        tmdbId = objectMapper.readTree(apiService.getTMDbId(movie.getTitle().trim(), repRlsDate));
        if (tmdbId.get("results").get(0) == null || tmdbId.get("results").get(0).get("id").asText().isEmpty()) {
            String title = formatTitleWithSpace(movie.getTitle().trim());
            tmdbId = objectMapper.readTree(apiService.getTMDbId(title, repRlsDate));

            if ((tmdbId.get("results").get(0) == null || tmdbId.get("results").get(0).get("id").asText().isEmpty()) && !repRlsDate.isBlank()) {
                tmdbId = objectMapper.readTree(apiService.getTMDbId(title, String.valueOf(Integer.parseInt(repRlsDate) -1)));
            }
        }


//        if (tmdbId.get("results").get(0) != null) {
        if (tmdbId.has("results")) {
            for (JsonNode result : tmdbId.get("results")) {

                if (result.get("title").asText().replaceAll(" ", "").equals(movie.getTitle().replaceAll(" ", ""))) {
                    id = result.get("id").asText();
                    String backd = result.get("backdrop_path").asText();
                    String poster = result.get("poster_path").asText();
                    String release_date = result.get("release_date").asText().length() > 4 ? result.get("release_date").asText().substring(0, 4) : result.get("release_date").asText();

                    if (!backd.equals("null") && !backd.isEmpty()) {
                        movie.setBackdrop("https://image.tmdb.org/t/p/original" + backd);
                    }

                    if ((!poster.equals("null") && !poster.isEmpty()) && movie.getPosters().isEmpty()) {
                        movie.setPosters("https://image.tmdb.org/t/p/original" + poster);
                    }
                }
//                else if (result.get("title").asText().equals(movie.getTitle())) {
//
//                }
            }

        }
        return id;
    }

        private void searchTMDbImage (Movie movie, String id) throws IOException {
            // TMDB 에서 영화 ID를 통해 영화 이미지 가져오기
            JsonNode tmdbImage = objectMapper.readTree(apiService.getTMDbImage(id));
            if (tmdbImage.get("backdrops") != null) {
                JsonNode backdrops = tmdbImage.get("backdrops");

                int count = 0;
                for (JsonNode backdrop : backdrops) {
                    if (count >= 4) {
                        break;
                    }
                    movie.setStlls("https://image.tmdb.org/t/p/original" + backdrop.get("file_path").asText() + "|" + movie.getStlls());
                    count++;
                }
            }
        }


    private void searchTMDbVideo(Movie movie, String id) throws IOException {
        // TMDB 에서 영화 예고편 가져오기
        JsonNode tmdbVideo = objectMapper.readTree(apiService.getTMDbVideo(id));
        if (tmdbVideo.get("results").get(0) != null) {
            String movieTrailer = "https://www.youtube.com/watch?v=" + tmdbVideo.get("results").get(0).get("key").asText();
            movie.setTrailer(movieTrailer);
        }
//        else if (tmdbVideo.get("results") == null) {
//            movie.setTrailer(null);
//         null 이면 에러페이지 URL
//        }
    }

    private String formatTitleWithSpace(String title) {
        if (title != null && title.length() > 0) {
            char lastChar = title.charAt(title.length() - 1);
            if (Character.isDigit(lastChar)) {
                title = title.substring(0, title.length() - 1) + " " + lastChar;
            }
        }
        return title;
    }



}
