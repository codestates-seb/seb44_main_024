package com.codestates.server.review.service;

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

    @Transactional(readOnly = true)
    public Review getReview(Long reviewId) {
//        Review review = reviewRepository.findById(reviewId).get();
        return reviewRepository.findById(reviewId).get();
    }


    public Review createReview(Review post, Set<String> tags) {
        Review review = reviewRepository.save(post);
        // ReviewTag 테이블에 Review와 tags 추가
        reviewTagService.addReviewTag(review, tags);
        // 로그인한 회원 정보
        // review.setMember(authenticationMember());
        // 영화 정보
        // review.setMovie(movieRepository.findById(movieId));
        return review;
    }


    @Transactional
    public Review updateReview(Review postToReview, Long reviewId, Set<String> tags) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Review not found with id: " + reviewId));

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
    public Review findverifyReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Review not found with id: " + reviewId));
//                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return review;
    }

    public Page<Review> getReviewsByDocId(int page,String docId) {
        return reviewRepository.findByDocId(PageRequest.of(page, 5, Sort.Direction.DESC, "likeCount"), docId);
    }

    // 등록된 리뷰 중 docId를 가지고 평균 평점 구하기
    public Double getAverageScore(String docId) {
        return reviewRepository.getAverageScoreByDocId(docId).orElse(0.0);
    }
}
