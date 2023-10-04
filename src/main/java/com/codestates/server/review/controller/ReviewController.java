package com.codestates.server.review.controller;


import com.codestates.server.review.dto.ReviewDto;
import com.codestates.server.review.entity.Review;
import com.codestates.server.review.mapper.ReviewMapper;
import com.codestates.server.review.service.ReviewService;
import com.codestates.server.utils.UriCreator;
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

    // 리뷰 작성
    @PostMapping("/movies/{movie-id}/reviews")
    public ResponseEntity postReview(@Valid @RequestBody ReviewDto.Post post,
                                     @PathVariable("movie-id") String docId) {
        Set<String> tags = post.getTags();
//        post.setDocId(docId);
        Review review = reviewService.createReview(reviewMapper.postToReview(post, docId), tags);


        // 해당 영화의 상세페이지로 리다이렉트
        return ResponseEntity.status(HttpStatus.SEE_OTHER)
                .location(URI.create("/movies/" + docId + "?page=1"))
                .build();
    }

    @PatchMapping("/reviews/{review-id}")
    public ResponseEntity patchReview(@Valid @RequestBody ReviewDto.Patch patch,
                                      @PathVariable("review-id") Long revieweId) {
        Set<String> tags = patch.getTags();
        Review review = reviewService.updateReview(reviewMapper.patchToReview(patch), revieweId, tags);

        URI location = UriCreator.createUri("/reviews", revieweId);

        // 해당 영화의 상세페이지로 리다이렉트
        return ResponseEntity.created(location).build();
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
}
