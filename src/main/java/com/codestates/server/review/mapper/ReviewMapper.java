package com.codestates.server.review.mapper;

import com.codestates.server.review.dto.ReviewDto;
import com.codestates.server.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {
    Review postToReview(ReviewDto.Post post);
    @Mapping(target = "tags",
            expression = "java(review.getReviewTags().stream().map(i -> i.getTagId()).collect(java.util.stream.Collectors.toSet()))")
    @Mapping(target = "likes",
                    expression = "java(review.getLikes().stream().count())")
    ReviewDto.Response reviewToResponse(Review review);
}
