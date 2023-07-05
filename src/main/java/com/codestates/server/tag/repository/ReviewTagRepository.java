package com.codestates.server.tag.repository;

import com.codestates.server.tag.entity.ReviewTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.beans.JavaBean;

@Repository
public interface ReviewTagRepository extends JpaRepository<ReviewTag, Long> {
}
