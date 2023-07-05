package com.codestates.server.like.entity;

import com.codestates.server.review.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne //(targetEntity = Tag.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id", insertable = false, updatable = false)
    private Review review;
    @Column(name = "review_id")
    private Long reviewId;

    private Boolean delete = false;
//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
}
