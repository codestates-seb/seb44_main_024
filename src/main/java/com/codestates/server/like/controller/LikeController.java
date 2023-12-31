package com.codestates.server.like.controller;

import com.codestates.server.like.mapper.LikeMapper;
import com.codestates.server.like.service.LikeService;
import com.codestates.server.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;
    private final LikeMapper likeMapper;
    private final ReviewService reviewService;

    @PostMapping("/review/{review-id}/likes")
    public ResponseEntity likes(@PathVariable("review-id") Long reviewId) {
        likeService.addlike(
                likeMapper.reviewToReviewLike(
                        reviewService.findverifyReview(reviewId)
                )
        );
        return new ResponseEntity(HttpStatus.OK);
    }
}
