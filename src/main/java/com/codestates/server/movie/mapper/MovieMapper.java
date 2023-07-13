package com.codestates.server.movie.mapper;

import com.codestates.server.movie.dto.MovieResponseDto;
import com.codestates.server.movie.entity.Movie;
import com.codestates.server.movie.entity.MovieActors;
import com.codestates.server.review.dto.ReviewDto;
import com.codestates.server.review.entity.Review;
import com.codestates.server.review.service.ReviewService;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface  MovieMapper {

    default MovieResponseDto.ResponseDetail movieToResponseDetail(Movie movie, Double avg, List<ReviewDto.Response> reviewList) {
        Movie.Data.Result result = movie.getData().get(0).getResult().get(0);
        ReviewService reviewService = new ReviewService();


        return MovieResponseDto.ResponseDetail.builder()
                .docId(result.getDocId())
                .title(result.getTitle().replaceAll("!HS|!HE", "").trim())
                .titleEng(result.getTitleEng())
                .description(result.getPlots().getPlot().get(0).getPlotText())
                .genre(result.getGenre())
                .runtime(result.getRuntime())
                .repRlsDate(result.getRepRlsDate())
                .nation(result.getNation())
                .rating(result.getRating())
                .directorNm(result.getDirectors().getDirector().get(0).getDirectorNm())
//                .actors(result.getActors().getActor().stream().map(i -> i.getActorNm()).collect(Collectors.toList()))
                .actors(MovieActors.movieActors(movie).stream().limit(10L).collect(Collectors.toList()))
                .posterUrl(result.getPosters().split("\\|")[0])
                .stills(Arrays.stream(result.getStlls().split("\\|")).limit(4L).collect(Collectors.toList()))
                .score(avg)
                .reviews(reviewList)
                .build();
    }





}
