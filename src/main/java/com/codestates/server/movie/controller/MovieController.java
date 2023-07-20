package com.codestates.server.movie.controller;

import com.codestates.server.dto.*;
import com.codestates.server.movie.entity.Movie;
import com.codestates.server.movie.mapper.MovieMapper;
import com.codestates.server.movie.service.MovieService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping
@AllArgsConstructor
@NoArgsConstructor
public class MovieController {
    @Autowired
    MovieService movieService;
    @Autowired
    MovieMapper movieMapper;

    @GetMapping("/main")
    public ResponseEntity getBoxOffice() {
        return new ResponseEntity(
                new MainResponseDto<>(
                        movieMapper.movieToResponse(movieService.getMovies("boxOffice")),
                        movieMapper.movieToResponse(movieService.getMovies("review")),
                        movieMapper.movieToResponse(movieService.getMovies("score"))
                ),
                HttpStatus.OK);
    }


    @GetMapping("/movies/{docid}")
    public ResponseEntity getMovieByDocid(@PathVariable("docid") String docid,
                                          @RequestParam("page") int page) throws IOException, ParseException {
        List<Object> response = movieService.getMovie(docid, page -1);

        return new ResponseEntity(new PageResponseDto<>(
                movieMapper.movieToResponseDetail((Movie) response.get(1)),
                movieMapper.movieToResponse((List<Movie>) response.get(0)),
                (Page) response.get(2)
        ), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity getMovieByQuery(@RequestParam String keyword) throws IOException, ParseException {
        List<Movie> movies = movieService.searchKeyword(keyword);
        List<Movie> topmovies = movieService.getMovies("score").subList(0, 5);
        return new ResponseEntity<>(
                new SearchResponseDto<>(
                        movieMapper.movieToResponse(movies)
                        ,movieMapper.movieToResponse(topmovies)
                )
                , HttpStatus.OK
        );
    }

    @GetMapping("/movies/tag")
    public ResponseEntity getMovieByTag(@RequestParam String tag) {
        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        movieMapper.movieToResponse(movieService.getMovies(tag + "score")),
                        movieMapper.movieToResponse(movieService.getMovies(tag + "review"))
                ),
                HttpStatus.OK);
    }

    @GetMapping("/movies/genre")
    public ResponseEntity getMovieByGenre(@RequestParam String genre) {
        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        movieMapper.movieToResponse(movieService.getMovies(genre + "score")),
                        movieMapper.movieToResponse(movieService.getMovies(genre + "review"))
                ),
                HttpStatus.OK);
    }

}
