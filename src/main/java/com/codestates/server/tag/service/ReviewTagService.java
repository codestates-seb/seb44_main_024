package com.codestates.server.tag.service;

import com.codestates.server.review.entity.Review;
import com.codestates.server.tag.entity.ReviewTag;
import com.codestates.server.tag.repository.ReviewTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class ReviewTagService {
    @Autowired
    ReviewTagRepository reviewTagRepository;

    @Transactional
    public void addReviewTag(Review review, Set<String> tags) {
        for (String tag : tags) {
            ReviewTag reviewTag = new ReviewTag();
            reviewTag.setReview(review);
            reviewTag.setTagId(tag);

            reviewTagRepository.save(reviewTag);
        }
    }
}
