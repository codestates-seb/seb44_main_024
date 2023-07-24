package com.codestates.server.tag.repository;

import com.codestates.server.review.entity.Review;
import com.codestates.server.tag.entity.ReviewTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface ReviewTagRepository extends JpaRepository<ReviewTag, Long> {
    Optional<Set<ReviewTag>> findByReview(Review review);
}
