package com.codestates.server.review.repository;

import com.codestates.server.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.OptionalDouble;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByDocId(Pageable pageable, String docId);

    @Query("SELECT ROUND(AVG(r.score), 1) FROM Review r WHERE r.docId = :docId")
    Optional<Double> getAverageScoreByDocId(@Param("docId") String docId);
}
