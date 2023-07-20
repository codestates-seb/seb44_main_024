package com.codestates.server.movie.service;

import com.codestates.server.api.service.ApiService;
import com.codestates.server.movie.entity.Movie;
import com.codestates.server.movie.scheduler.MovieScheduler;
import com.codestates.server.review.entity.Review;
import com.codestates.server.review.mapper.ReviewMapper;
import com.codestates.server.review.service.ReviewService;
import com.codestates.server.utils.MovieUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
                        movie.setScore(reviewService.getAverageScore(movie.getDocId()));
                        return movie;
                    } catch (JsonProcessingException e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toList());
    }

    private Movie getMovieByResult(String str) {
        try {
            Movie movie = objectMapper.readValue(str, Movie.class);
            movie.setScore(reviewService.getAverageScore(movie.getDocId()));
            return movie;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
