package com.codestates.server.movie.mapper;

import com.codestates.server.movie.dto.MovieResponseDto;
import com.codestates.server.movie.entity.Movie;
import com.codestates.server.movie.entity.MovieActors;
import org.mapstruct.Mapper;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MovieMapper {

    default MovieResponseDto.ResponseDetail movieToResponseDetail(Movie movie) {

        return MovieResponseDto.ResponseDetail.builder()
                .docId(movie.getDocId())
                .score(movie.getScore())
                .title(movie.getTitle().replaceAll("!HS|!HE", "").trim().replaceAll("\\s+", " "))
                .titleEng(movie.getTitleEng())
                .description(movie.getPlots().getPlot().get(0).getPlotText())
                .genre(movie.getGenre())
                .runtime(getruntime(movie))
                .repRlsDate(getrepRlsDate(movie).substring(0, 4))
                .nation(movie.getNation())
                .rating(getrating(movie))
                .trailer(movie.getTrailer())
                .backdrop(movie.getBackdrop())
                .directorNm(movie.getDirectors().getDirector().get(0).getDirectorNm())
                .actors(MovieActors.movieActors(movie).stream().limit(10L).collect(Collectors.toList()))
                .posterUrl(setNoData(movie).getPosters().split("\\|")[0])
                .stills(Arrays.stream(setNoData(movie).getStlls().split("\\|")).limit(4L).collect(Collectors.toList()))
                .review_count(movie.getReviewCount())
                .reviews(movie.getReview())
                .build();
    }

    List<MovieResponseDto.MovieReviewDto> movieToMovieReview(List<Movie> movies);


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

    default String getrating(Movie i) {
        if (i.getRating().equals("")) {
            return "미정";
        }
        return i.getRating();
    }

    default String getruntime(Movie i) {
        if (i.getRuntime().isEmpty()) {
            return "00";
        }
        return i.getRuntime();
    }


    default Movie setNoData(Movie i) {
        if (i.getPosters().isEmpty()) {
            i.setPosters("https://s3-eu-west-1.amazonaws.com/entertainmentie/uploads/2021/08/27144852/generic-movie-poster.jpg");
        }

        if (i.getStlls().isBlank()) {
            i.setStlls("https://digitalfinger.id/wp-content/uploads/2019/12/no-image-available-icon-6.png|".repeat(4).replaceAll("\\|$", ""));
        } else if (1 <= i.getStlls().split("\\|").length && i.getStlls().split("\\|").length < 4) {
            i.setStlls(i.getStlls().repeat(4).replaceAll("\\|$", ""));
        }
        return i;
    }
}
