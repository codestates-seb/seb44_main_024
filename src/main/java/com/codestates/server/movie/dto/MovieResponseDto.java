package com.codestates.server.movie.dto;

import com.codestates.server.movie.entity.MovieActors;
import com.codestates.server.review.dto.ReviewDto;
import com.codestates.server.review.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class MovieResponseDto {
    @Getter
    @Builder
    public static class Response {
        // 영화 제목, 개봉일, 별점, 포스터, docId
        private String docId;
        private String title;
        private String repRlsDate;
        private String posterUrl;
        private Double score;
    }
    @Getter
    @Builder
    @AllArgsConstructor
    public static class ResponseDetail {
        private String docId;
        private String title;
        private String titleEng;
        private String description;
        private String genre;
        private String runtime;
        private String repRlsDate;
        private String nation;
        private String rating;
        private String directorNm;
        private List<MovieActors> actors;
        private String posterUrl;
        private List<String> stills;
        private Double score;
        private int review_count;
        private List<ReviewDto.Response> reviews;
    }
}
