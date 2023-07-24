package com.codestates.server.like.entity;

import com.codestates.server.member.entity.Member;
import com.codestates.server.review.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ReviewLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne //(targetEntity = Tag.class, fetch = FetchType.LAZY)
//    @JoinColumn(name = "review_id", insertable = false, updatable = false)
    @JoinColumn(name = "REVIEW_ID")
    private Review review;
//    @Column(name = "review_id")
//    private Long reviewId;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @CreatedDate
    @Column(updatable = false, nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime createAt;

//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//
//        ReviewLike that = (ReviewLike) o;
//
//        if (review != null ? !review.equals(that.review) : that.review != null) return false;
//        return member != null ? member.equals(that.member) : that.member == null;
//    }
//
//    @Override
//    public int hashCode() {
//        int result = review != null ? review.hashCode() : 0;
//        result = 31 * result + (member != null ? member.hashCode() : 0);
//        return result;
//    }

}
