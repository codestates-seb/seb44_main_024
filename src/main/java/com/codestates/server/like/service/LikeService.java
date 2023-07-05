package com.codestates.server.like.service;

import com.codestates.server.like.entity.ReviewLike;
import com.codestates.server.like.repository.LikeRepository;
import com.codestates.server.review.entity.Review;
import com.codestates.server.review.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeService {
    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Transactional
    public void addlike(ReviewLike like) {
        likeRepository.save(like);
    }
}
