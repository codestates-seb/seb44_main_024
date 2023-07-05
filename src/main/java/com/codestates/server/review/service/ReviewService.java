package com.codestates.server.review.service;

import com.codestates.server.review.entity.Review;
import com.codestates.server.review.repository.ReviewRepository;
import com.codestates.server.tag.entity.ReviewTag;
import com.codestates.server.tag.repository.ReviewTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewService {
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    ReviewTagRepository reviewTagRepository;

    public Review getReview(Long reviewId) {
//        Review review = reviewRepository.findById(reviewId).get();
        return reviewRepository.findById(reviewId).get();
    }

    public Review createReview(Review review, Long movieId) {
        // 로그인한 회원 정보
        // review.setMember(authenticationMember());
        // 영화 정보
        // review.setMovie(movieRepository.findById(movieId));
        return reviewRepository.save(review);
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
}
