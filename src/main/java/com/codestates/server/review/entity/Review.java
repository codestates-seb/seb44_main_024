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

    // Member 와 1:N 연관관계 설정
    // 어떤 회원이 해당 리뷰를 작성했는지
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    // Movie 와 1:N 연관관계 설정
    // 어떤 영화에 리뷰가 작성된건지
    // Movie 엔티티를 작성하지 않으면 Long 타입으로 영화 ID 값을 저장한다.
//    @ManyToOne
//    @JoinColumn(name = "MOVIE_ID")
//    private Movie movie;

    @Column(nullable = false)
    private Double score;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private String genre;
    @CreatedDate
    @Column(updatable = false, nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime create_at;
    @LastModifiedDate
    @Column(nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime update_at;

    @OneToMany(mappedBy = "review", cascade = CascadeType.REMOVE)
    private List<ReviewLike> likes = new ArrayList<>();

    @Formula("(SELECT COUNT(*) FROM REVIEW_LIKE rl WHERE rl.review_id = id)")
    private Long likeCount;

    @OneToMany(mappedBy = "review", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<ReviewTag> reviewTags = new LinkedHashSet<>();

    public void addTag(Set<String> tags) {
        this.reviewTags  = tags.stream()
                .map(i -> new ReviewTag(this, i))
                .collect(Collectors.toSet());
    }

//    @ElementCollection
//    @CollectionTable(name = "review_tags",
//            joinColumns = @JoinColumn(name = "review_id"))
//    @Column(name = "tag")
////    @Enumerated(EnumType.STRING) // 태그 값이 Enum 형태일 경우에만 사용
//    private Set<String> tags;
}
