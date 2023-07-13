package com.codestates.server.movie.controller;

import com.codestates.server.dto.MultiResponseDto;
import com.codestates.server.movie.entity.Movie;
import com.codestates.server.movie.mapper.MovieMapper;
import com.codestates.server.review.entity.Review;
import com.codestates.server.review.mapper.ReviewMapper;
import com.codestates.server.review.service.ReviewService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/movie")
public class MovieApiController {
    @Autowired
    MovieMapper movieMapper;

    @Autowired
    ReviewService reviewService;

    @Autowired
    ReviewMapper reviewMapper;

    @Value("${api.key}")
    private String apiKey;

    @GetMapping
    public ResponseEntity<String> getMovies() {
        try {
            URI uri = UriComponentsBuilder.fromUriString("https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp")
                    .queryParam("collection", "kmdb_new2")
                    .queryParam("ServiceKey", apiKey)
                    .build()
                    .toUri();

            Object result = executeGetRequest(uri);

            return ResponseEntity.ok(String.valueOf(result));
        } catch (HttpClientErrorException e) {
            HttpStatus statusCode = e.getStatusCode();
            return ResponseEntity.status(statusCode).body(e.getMessage());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @GetMapping("/{docid}")
    public ResponseEntity getMovieByDocid(@PathVariable("docid") String docid,
                                          @RequestParam("page") int page) {
        try {
            String movieId = docid.substring(0, 1);
            String movieSeq = docid.substring(1);
            URI uri = UriComponentsBuilder.fromUriString("https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp")
                    .queryParam("collection", "kmdb_new2")
                    .queryParam("ServiceKey", apiKey)
                    .queryParam("movieId", movieId)
                    .queryParam("movieSeq", movieSeq)
                    .build()
                    .toUri();

            Movie movie = executeGetRequest(uri);

            Page<Review> reviewPage = reviewService.getReviewsByDocId(
                    page
                    ,movie.getData().get(0).getResult().get(0).getDocId());

            List<Review> reviews = reviewPage.getContent();

            return new ResponseEntity<>(new MultiResponseDto<>(
                    movieMapper.movieToResponseDetail(
                            movie,
                            reviewService.getAverageScore(movie.getData().get(0).getResult().get(0).getDocId()),
                            reviewMapper.reviewsToResponses(reviews)), reviewPage),
                    HttpStatus.OK);
        } catch (HttpClientErrorException e) {
            HttpStatus statusCode = e.getStatusCode();
            return ResponseEntity.status(statusCode).body(e.getMessage());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @GetMapping("/search")
    public ResponseEntity<String> getMovieByQuery( // @PathVariable("query") String query
                                                   @RequestParam String keyword) {
//        String encodeQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
//        String encodeAPI = URLEncoder.encode(apiKey, StandardCharsets.UTF_8);
        try {
            URI uri = UriComponentsBuilder.fromUriString("https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp")
                    .queryParam("collection", "kmdb_new2")
                    .queryParam("ServiceKey", apiKey)
                    .queryParam("query", keyword)
                    .build()
                    .encode()
                    .toUri();

            Object result = executeGetRequest(uri);

            return ResponseEntity.ok(String.valueOf(result));
        } catch (HttpClientErrorException e) {
            System.out.println("HttpClientErrorException");

            HttpStatus statusCode = e.getStatusCode();
            return ResponseEntity.status(statusCode).body(e.getMessage());
        } catch (IOException e) {
            System.out.println("IOException");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    private Movie executeGetRequest(URI uri) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return objectMapper.readValue(restTemplate.getForObject(uri, String.class), Movie.class);
    }
}
