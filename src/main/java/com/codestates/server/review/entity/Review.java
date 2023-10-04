package com.codestates.server.review.entity;

import com.codestates.server.like.entity.ReviewLike;
import com.codestates.server.member.entity.Member;
import com.codestates.server.tag.entity.ReviewTag;
import lombok.*;
import org.hibernate.annotations.Formula;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String docId;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @Column(nullable = false)
    private Double score;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private String genre;
    @CreatedDate
    @Column(updatable = false, nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime createAt;
    @LastModifiedDate
    @Column(nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime updateAt;

    @OneToMany(mappedBy = "review", cascade = CascadeType.REMOVE)
    private List<ReviewLike> likes = new ArrayList<>();

    @Formula("(SELECT COUNT(*) FROM REVIEW_LIKE rl WHERE rl.review_id = id)")
    private Long likeCount;

    @OneToMany(mappedBy = "review", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<ReviewTag> reviewTags = new LinkedHashSet<>();

    public void addTag(Set<String> tags) {
        this.reviewTags = tags.stream()
                .map(i -> new ReviewTag(this, i))
                .collect(Collectors.toSet());
    }
}
