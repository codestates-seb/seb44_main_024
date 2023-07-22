package com.codestates.server.review.dto;

import com.codestates.server.member.dto.MemberDto;
import com.codestates.server.member.entity.Member;
import lombok.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;

public class ReviewDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        @Min(0)
        @Max(5)
        @NotNull
        private double score;
        private String docId;
        @NotBlank
        private String content;
        @NotBlank
        private String genre;
        private Set<String> tags;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        @Min(0)
        @Max(5)
        @NotNull
        private double score;
        @NotBlank
        private String content;
        private Set<String> tags;
    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private Long reviewId;
        private String docId;
        private double score;
        private String content;
        private MemberDto.Response user;
        private Set<String> tags;
        private long likes;
    }
}
