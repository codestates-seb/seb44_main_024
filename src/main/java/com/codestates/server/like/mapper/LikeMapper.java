package com.codestates.server.like.mapper;

import com.codestates.server.like.entity.ReviewLike;
import com.codestates.server.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LikeMapper {
//    @Mapping(target = "reviewId", source = "review_id")
//    ReviewLike reviewIdToLike(Long review_id);
    @Mapping(target = "review", source = "review")
    ReviewLike reviewToReviewLike(Review review);
}
