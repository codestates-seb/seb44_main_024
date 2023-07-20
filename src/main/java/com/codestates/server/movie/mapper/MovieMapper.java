package com.codestates.server.movie.mapper;

import com.codestates.server.movie.dto.MovieResponseDto;
import com.codestates.server.movie.entity.Movie;
import com.codestates.server.movie.entity.MovieActors;
import org.mapstruct.Mapper;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface  MovieMapper {

    default MovieResponseDto.ResponseDetail movieToResponseDetail(Movie movie) {

        return MovieResponseDto.ResponseDetail.builder()
                .docId(movie.getDocId())
                .score(movie.getScore())
                .title(movie.getTitle().replaceAll("!HS|!HE", "").trim().replaceAll("\\s+", " "))
                .titleEng(movie.getTitleEng())
                .description(movie.getPlots().getPlot().get(0).getPlotText())
                .genre(movie.getGenre())
                .runtime(movie.getRuntime())
                .repRlsDate(getrepRlsDate(movie).substring(0, 4))
                .nation(movie.getNation())
                .rating(movie.getRating())
                .directorNm(movie.getDirectors().getDirector().get(0).getDirectorNm())
                .actors(MovieActors.movieActors(movie).stream().limit(10L).collect(Collectors.toList()))
                .posterUrl(setNoData(movie).getPosters().split("\\|")[0])
                .stills(Arrays.stream(setNoData(movie).getStlls().split("\\|")).limit(4L).collect(Collectors.toList()))
                .review_count(movie.getReviewCount())
                .reviews(movie.getReview())
                .build();
    }


    default List<MovieResponseDto.Response> movieToResponse(List<Movie> movies) {

            return movies.stream()
                    .map(i ->
                            MovieResponseDto.Response.builder()
                            .docId(i.getDocId())
                            .title(i.getTitle().replaceAll("!HS|!HE", "").trim().replaceAll("\\s+", " "))
                            .repRlsDate(getrepRlsDate(i).substring(0, 4))
                            .posterUrl(setNoData(i).getPosters().split("\\|")[0])//i.getPosters().split("\\|")[0])
                            .score(i.getScore())
                            .build())
                    .collect(Collectors.toList());
    }

    default String getrepRlsDate(Movie i) {
        if (i.getRepRlsDate().length() < 4) {
            return "00000000";
        }
        return i.getRepRlsDate();
    }

    default Movie setNoData(Movie i) {
        if (i.getPosters().equals("")) {
            i.setPosters("https://s3-eu-west-1.amazonaws.com/entertainmentie/uploads/2021/08/27144852/generic-movie-poster.jpg");
        }
        if (i.getRepRlsDate().equals("")) {
            i.setRepRlsDate("00000000");
        }
        if (i.getStlls().equals("")) {
            i.setStlls("https://digitalfinger.id/wp-content/uploads/2019/12/no-image-available-icon-6.png|".repeat(4).replaceAll("\\|$", ""));
        }
        return i;
    }
}
