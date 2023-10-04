package com.codestates.server.member.mapper;

import com.codestates.server.member.dto.MemberDto;
import com.codestates.server.member.entity.Member;
import com.codestates.server.movie.dto.MovieResponseDto;
import com.codestates.server.review.dto.ReviewDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post requestBody);
    Member memberPatchToMember(MemberDto.Patch requestBody);
    MemberDto.Response memberToMemberResponse(Member member);
    List<MemberDto.Response> membersToMemberResponses(List<Member> members);

    default List<MemberDto.MovieReview> movieAndreview(List<ReviewDto.Response> reviews, List<MovieResponseDto.MovieReviewDto> movies) {
        return IntStream.range(0, reviews.size())
                .mapToObj(i ->
                        MemberDto.MovieReview.builder()
                                .movie(movies.get(i))
                                .review(reviews.get(i))
                                .build())
                .collect(Collectors.toList());
    }
}
