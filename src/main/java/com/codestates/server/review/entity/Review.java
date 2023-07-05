package com.codestates.server.review.entity;

import com.codestates.server.tag.entity.ReviewTag;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

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

    // Member 와 1:N 연관관계 설정
    // 어떤 회원이 해당 리뷰를 작성했는지
//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;

    // Movie 와 1:N 연관관계 설정
    // 어떤 영화에 리뷰가 작성된건지
    // Movie 엔티티를 작성하지 않으면 Long 타입으로 영화 ID 값을 저장한다.
//    @ManyToOne
//    @JoinColumn(name = "MOVIE_ID")
//    private Movie movie;

    @Column(nullable = false)
    private int score;
    @Column(nullable = false)
    private String content;
    @CreatedDate
    @Column(updatable = false, nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime create_at;
    @LastModifiedDate
    @Column(nullable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime update_at;

    @OneToMany(mappedBy = "review")
    private Set<ReviewTag> reviewTags = new HashSet<>();

//    @ElementCollection
//    @CollectionTable(name = "review_tags",
//            joinColumns = @JoinColumn(name = "review_id"))
//    @Column(name = "tag")
////    @Enumerated(EnumType.STRING) // 태그 값이 Enum 형태일 경우에만 사용
//    private Set<String> tags;
}
