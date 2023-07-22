package com.codestates.server.review.mapper;

import com.codestates.server.member.dto.MemberDto;
import com.codestates.server.member.entity.Member;
import com.codestates.server.member.mapper.MemberMapper;
import com.codestates.server.review.dto.ReviewDto;
import com.codestates.server.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = MemberMapper.class)
public interface ReviewMapper {
    @Mapping(target = "docId", source = "docId")
    Review postToReview(ReviewDto.Post post, String docId);

    Review patchToReview(ReviewDto.Patch patch);

    @Mapping(target = "tags",
            expression = "java(review.getReviewTags().stream().map(i -> i.getTagId()).collect(java.util.stream.Collectors.toSet()))")
    @Mapping(target = "likes",
            expression = "java(review.getLikes().stream().count())")
    @Mapping(target = "reviewId",
            expression = "java(review.getId())")
    @Mapping(target = "user", source = "review.member")
    ReviewDto.Response reviewToResponse(Review review);

    @Mapping(target = "user", source = "review.member")
    default List<ReviewDto.Response> reviewsToResponses(List<Review> reviews) {

        return reviews.stream()
                .map(i -> {
                            Member member = i.getMember();
                            return ReviewDto.Response.builder()
                                    .reviewId(i.getId())
                                    .docId(i.getDocId())
                                    .score(i.getScore())
                                    .content(i.getContent())
                                    .user(MemberDto.Response.builder()
                                            .memberId(member.getMemberId())
                                            .username(member.getUsername())
                                            .profile_img(member.getProfile_img())
                                            .build())
                                    .tags(i.getReviewTags()
                                            .stream()
                                            .map(j -> j.getTagId())
                                            .collect(Collectors.toSet()))
                                    .likes(i.getLikes().stream().count())
                                    .build();
                        }
                )
                .collect(Collectors.toList());
    }
}
