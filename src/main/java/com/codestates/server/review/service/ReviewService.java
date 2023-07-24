package com.codestates.server.review.service;

import com.codestates.server.exception.BusinessLogicException;
import com.codestates.server.exception.ExceptionCode;
import com.codestates.server.member.entity.Member;
import com.codestates.server.member.service.MemberService;
import com.codestates.server.review.entity.Review;
import com.codestates.server.review.repository.ReviewRepository;
import com.codestates.server.tag.service.ReviewTagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewService {
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    ReviewTagService reviewTagService;
    @Autowired
    MemberService memberService;

    @Transactional(readOnly = true)
    public Review getReview(Long reviewId) {
//        Review review = reviewRepository.findById(reviewId).get();
        return findverifyReview(reviewId);
    }


    public Review createReview(Review post, Set<String> tags) {
        Member member = memberService.authenticationMember();
        post.setMember(member);
        
        Review review = reviewRepository.save(post);
        // ReviewTag 테이블에 Review와 tags 추가
        reviewTagService.addReviewTag(review, tags);

        return review;
    }


    public Review updateReview(Review postToReview, Long reviewId, Set<String> tags) {
        Review review = findverifyReview(reviewId);

        if (memberService.authenticationMember().getMemberId() != review.getMember().getMemberId()) {
            System.out.println("if BusinessLogicException");
            throw new BusinessLogicException(ExceptionCode.REVIEW_FORBIDDEN);
        }

        if (review.getScore() != postToReview.getScore())
            review.setScore(postToReview.getScore());
        if (review.getContent() != postToReview.getContent())
            review.setContent(postToReview.getContent());

        Set<String> reviewTags = review.getReviewTags().stream()
                .map(i -> i.getTagId())
                .collect(Collectors.toSet());

        if (!tags.equals(reviewTags)) {
            reviewTagService.updateReviewTag(review, tags);
        }
        return reviewRepository.save(review);
    }

    public void deleteReview(Long reviewId) {
        Review review = findverifyReview(reviewId);

        if (memberService.authenticationMember().getMemberId() != review.getMember().getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.REVIEW_FORBIDDEN);
        }

        reviewRepository.delete(review);
    }


    // 로그인한 회원 정보 확인
//    private Member authenticationMember() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        //현재 로그인한 사용자 이메일
//        String username = (String) authentication.getPrincipal();
//
//        // 로그인한 ID(이매일)로 Member를 찾아서 반환
//        return memberService.findVerifiedMember(username);
//    }


    // 등록된 리뷰 중 해당 Id를 가진 리뷰 리턴
    @Transactional(readOnly = true)
    public Review findverifyReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUNT));
        return review;
    }

    // 특정 회원이 등록한 리뷰를 찾아서 반환한다.
    @Transactional(readOnly = true)
    public Page<Review> findverifyReviews(Member member, int page) {
        Page<Review> reviewPage = reviewRepository.findByMember(member, PageRequest.of(page, 5, Sort.Direction.DESC, "updateAt"));
        return reviewPage;
    }
    @Transactional(readOnly = true)
    public Page<Review> getReviewsByDocId(int page,String docId) {
        return reviewRepository.findByDocId(PageRequest.of(page, 5, Sort.Direction.DESC, "likeCount"), docId);
    }

    // 등록된 리뷰 중 docId를 가지고 평균 평점 구하기
    @Transactional(readOnly = true)
    public Double getAverageScore(String docId) {
        return reviewRepository.getAverageScoreByDocId(docId).orElse(0.0);
    }
}
