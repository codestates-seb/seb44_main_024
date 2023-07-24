package com.codestates.server.review.repository;

import com.codestates.server.member.entity.Member;
import com.codestates.server.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByDocId(Pageable pageable, String docId);

    Page<Review> findByMember(Member member, Pageable pageable);

    @Query("SELECT ROUND(AVG(r.score), 1) FROM Review r WHERE r.docId = :docId")
    Optional<Double> getAverageScoreByDocId(@Param("docId") String docId);

    //    @Query("SELECT r.docId FROM Review r GROUP BY r.docId ORDER BY COUNT(r.docId) DESC LIMIT 5")
    @Query("SELECT r.docId FROM Review r GROUP BY r.docId ORDER BY COUNT(r.docId) DESC")
    List<String> findMostReviewsWithDocId(Pageable pageable);

    @Query("SELECT r.docId as avgScore FROM Review r GROUP BY r.docId ORDER BY AVG(r.score) DESC")
    List<String> findHighestScoreWithDocId(Pageable pageable);

    @Query("SELECT r.docId FROM Review r WHERE r.genre LIKE CONCAT('%', :genre, '%') GROUP BY r.docId ORDER BY COUNT(r.docId) DESC")
    List<String> findMostReviewsWithGenre(@Param("genre") String genre, Pageable pageable);
    // SELECT * FROM Question q WHERE LOWER(q.title) LIKE LOWER(CONCAT('%', :title, '%'))

    @Query("SELECT r.docId FROM Review r WHERE r.genre LIKE CONCAT('%', :genre, '%') GROUP BY r.docId ORDER BY AVG(r.score) DESC")
    List<String> findHighestScoreWithGenre(@Param("genre") String genre, Pageable pageable);

    @Query("SELECT r.docId FROM Review r JOIN r.reviewTags rt JOIN rt.tag t WHERE t.id = :tag GROUP BY r.docId ORDER BY COUNT(r.docId) DESC")
    List<String> findDocIdsByTagWithMostReviews(@Param("tag") String tag, Pageable pageable);

    @Query("SELECT r.docId FROM Review r JOIN r.reviewTags rt JOIN rt.tag t WHERE t.id = :tag GROUP BY r.docId ORDER BY AVG(r.score) DESC")
    List<String> findDocIdsByTagWithHighestScore(@Param("tag") String tag, Pageable pageable);
}
