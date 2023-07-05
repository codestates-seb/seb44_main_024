package com.codestates.server.like.repository;

import com.codestates.server.like.entity.ReviewLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<ReviewLike, Long> {
}
