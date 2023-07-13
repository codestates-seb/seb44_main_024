package com.codestates.server.review.controller;


import com.codestates.server.review.dto.ReviewDto;
import com.codestates.server.review.entity.Review;
import com.codestates.server.review.mapper.ReviewMapper;
import com.codestates.server.review.service.ReviewService;
import com.codestates.server.tag.entity.ReviewTag;
import com.codestates.server.tag.service.ReviewTagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.Set;

@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewMapper reviewMapper;
    private final ReviewService reviewService;
    private final ReviewTagService reviewTagService;

    // 리뷰 작성
    @PostMapping("/movies/{movie-id}/reviews")
    public ResponseEntity postReview(@Valid @RequestBody ReviewDto.Post post,
                                     @PathVariable("movie-id") String docId) {
        Set<String> tags = post.getTags();
        post.setDocId(docId);
        Review review = reviewService.createReview(reviewMapper.postToReview(post), tags);


        // 해당 영화의 상세페이지로 리다이렉트
        return ResponseEntity.status(HttpStatus.SEE_OTHER)
                .location(URI.create("/movies"))
                .build();
    }

    @PatchMapping("/reviews/{review-id}")
    public ResponseEntity patchReview(@Valid @RequestBody ReviewDto.Post patch,
                                      @PathVariable("review-id") Long revieweId) {
        Set<String> tags = patch.getTags();
        Review review = reviewService.updateReview(reviewMapper.postToReview(patch), revieweId, tags);

//        reviewTagService.updateReviewTag(review, tags);

        // 해당 영화의 상세페이지로 리다이렉트
        return ResponseEntity.status(HttpStatus.SEE_OTHER)
                .location(URI.create("/movies"))
                .build();
    }

    // 한개의 리뷰 확인
    @GetMapping("/review/{review-id}")
    public ResponseEntity getReview(@PathVariable("review-id") Long reviewId) {
        Review review = reviewService.getReview(reviewId);

        return new ResponseEntity(reviewMapper.reviewToResponse(review), HttpStatus.OK);
    }


    @DeleteMapping("/reviews/{review-id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteReview(@PathVariable("review-id") Long reviewId) {
        reviewService.deleteReview(reviewId);
    }


    // 임시 메서드.
    @GetMapping("/movies")

    public ResponseEntity getMovie() {
        return new ResponseEntity("haha", HttpStatus.OK);
    }
}
