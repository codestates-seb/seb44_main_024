package com.codestates.server.tag.service;

import com.codestates.server.review.entity.Review;
import com.codestates.server.tag.entity.ReviewTag;
import com.codestates.server.tag.repository.ReviewTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@Transactional
public class ReviewTagService {
    @Autowired
    ReviewTagRepository reviewTagRepository;

    public void addReviewTag(Review review, Set<String> tags) {
        for (String tag : tags) {
            ReviewTag reviewTag = new ReviewTag();
            reviewTag.setReview(review);
            reviewTag.setTagId(tag);

            reviewTagRepository.save(reviewTag);
        }
    }

    // ReviewTag 업데이트 메서드
    // ReviewService에서 수정한 리뷰의 태그를 확인하여 기존과 다르면 해당 메서드를 호출한다.
    public void updateReviewTag(Review review, Set<String> tags) {
        // 해당 Review가 포함된 ReviewTag를 모두 찾는다.
        Set<ReviewTag> reviewTags = reviewTagRepository.findByReview(review)
                .orElseThrow(() -> new IllegalArgumentException("ReviewTag not found"));

        // 해당 Review에 대한 Tag 모두 삭제
        reviewTagRepository.deleteAll(reviewTags);

        // 태그가 한개 이상이면 해당 Review의 Tag 추가
        if (tags.size() != 0) {
            addReviewTag(review, tags);
        }
    }

}
