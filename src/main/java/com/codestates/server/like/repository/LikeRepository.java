package com.codestates.server.like.repository;

import com.codestates.server.like.entity.ReviewLike;
import com.codestates.server.member.entity.Member;
import com.codestates.server.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<ReviewLike, Long> {
//    @Query("SELECT rl FROM ReviewLike rl WHERE rl.review = :review AND rl.member = :member")
    Optional<ReviewLike> findReviewLikeByReviewEqualsAndMember(Review review, Member member);
    Boolean existsByReviewAndMember(Review review, Member member);

    ReviewLike findByReviewAndMember(Review review, Member member);
}
