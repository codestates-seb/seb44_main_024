package com.codestates.server.like.service;

import com.codestates.server.like.entity.ReviewLike;
import com.codestates.server.like.repository.LikeRepository;
import com.codestates.server.member.entity.Member;
import com.codestates.server.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LikeService {
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private MemberService memberService;

    public void addlike(ReviewLike reviewLike) {
        Member member = memberService.authenticationMember();
        reviewLike.setMember(member);

        if (!verifyExistsLike(reviewLike)) {
            likeRepository.save(reviewLike);
        } else {
                // 중복 좋아요인 경우, 이미 저장되어있는 객체를 삭제합니다.
                ReviewLike existingLike = likeRepository.findByReviewAndMember(reviewLike.getReview(), reviewLike.getMember());
                deleteLike(existingLike);
        }
    }
    private void deleteLike(ReviewLike like) {
        likeRepository.delete(like);
    }

//        private boolean verifyExistsLike(ReviewLike like) {
//        return likeRepository.findReviewLikeByReviewEqualsAndMember(like.getReview(), like.getMember())
//                .isPresent();
//    }
    private boolean verifyExistsLike(ReviewLike like) {
        return likeRepository.existsByReviewAndMember(like.getReview(), like.getMember());
    }
}
