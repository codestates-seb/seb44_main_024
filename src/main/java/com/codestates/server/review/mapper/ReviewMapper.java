package com.codestates.server.review.mapper;

import com.codestates.server.review.dto.ReviewDto;
import com.codestates.server.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {
    Review postToReview(ReviewDto.Post post);
    @Mapping(target = "tags",
            expression = "java(review.getReviewTags().stream().map(i -> i.getTagId()).collect(java.util.stream.Collectors.toSet()))")
    @Mapping(target = "likes",
                    expression = "java(review.getLikes().stream().count())")
    ReviewDto.Response reviewToResponse(Review review);

    default List<ReviewDto.Response> reviewsToResponses(List<Review> reviews) {
        return reviews.stream()
                .map(i -> ReviewDto.Response.builder()
                        .reviewId(i.getId())
                        .docId(i.getDocId())
                        .score(i.getScore())
                        .content(i.getContent())
                        .tags(i.getReviewTags()
                                .stream()
                                .map(j -> j.getTagId())
                                .collect(Collectors.toSet()))
                        .likes(i.getLikes().stream().count())
                        .build())
                .collect(Collectors.toList());
    }
}
