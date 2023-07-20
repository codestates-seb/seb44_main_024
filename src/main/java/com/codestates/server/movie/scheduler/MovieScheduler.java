package com.codestates.server.movie.scheduler;

import com.codestates.server.api.service.ApiService;
import com.codestates.server.review.repository.ReviewRepository;
import com.codestates.server.tag.entity.Tag;
import com.codestates.server.tag.repository.TagRepository;
import com.codestates.server.utils.MovieUtils;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class MovieScheduler {
    private final MovieUtils movieUtils;
    private final ApiService apiService;
    private final ReviewRepository reviewRepository;
    private final TagRepository tagRepository;

    private Map<String, List<String>> mainMap = new HashMap();
    private final int PAGE_SIZE = 10;

    @Scheduled(fixedRate = 86400000)
    public void boxOfficeScheduled() throws IOException, ParseException {
        List<String> boxOfficeList = new ArrayList<>();
        for (String str : movieUtils.getBoxOffice()) {
            movieUtils.getResult(apiService.getKMDbByTitle(str))
                    .stream()
                    .forEach(i -> boxOfficeList.add(i));
        }
        mainMap.put("boxOffice", boxOfficeList);
    }


    @Scheduled(fixedRate = 7200000)
    public void reviewScheduled() throws IOException, ParseException {
        // 리뷰가 많은 영화Id 값을 가져온다.
        List<String> reviewList = getMoviesWithMostReviews();
        mainMap.put("review", reviewList);
    }

    @Scheduled(fixedRate = 7200000)
    public void scoreScheduled() throws IOException, ParseException {
        // 평점이 높은 영화Id 값을 가져온다.
        List<String> scoreList = getMoviesWithHighestScore();
        mainMap.put("score", scoreList);
    }

    @Scheduled(fixedRate = 7200000)
    public void tagScheduled() throws IOException, ParseException {
        List<String> tags = tagRepository.findAll()
                .stream()
                .map(Tag::getId)
                .collect(Collectors.toList());

        for (String tag : tags) {
            List<String> tagScore = getMoviesWithHighestScoreByTag(tag);
            List<String> tagReview = getMoviesWithMostReviewsByTag(tag);

            mainMap.put(tag + "score", tagScore);
            mainMap.put(tag + "review", tagReview);
        }
    }

    @Scheduled(fixedRate = 7200000)
    public void genreScheduled() throws IOException, ParseException {

        List<String> genres = List.of("액션", "범죄", "느와르", "드라마", "멜로", "로맨스", "판타지", "SF", "재난", "코메디", "공포", "뮤직", "스포츠", "미스터리", "어드벤처", "가족", "뮤지컬", "스릴러", "전쟁");

        for (String genre : genres) {
            List<String> genreScore = getMoviesWithHighestScoreByGenre(genre);
            List<String> genreReview = getMoviesWithMostReviewsByGenre(genre);

            mainMap.put(genre + "score", genreScore);
            mainMap.put(genre + "review", genreReview);
        }
    }





    private List<String> getMoviesWithMostReviews() throws IOException, ParseException {
        List<String> reviewList = movieUtils.getResult(
                apiService.getKMDbBydocIds(
                        reviewRepository.findMostReviewsWithDocId(PageRequest.of(0, PAGE_SIZE))
                )
        );

        if (reviewList.size() < PAGE_SIZE) {
            String response = apiService.getLatestmovies(PAGE_SIZE - reviewList.size());
            reviewList.addAll(movieUtils.getResult(response));
        }
        return reviewList;
    }

    private List<String> getMoviesWithHighestScore() throws IOException, ParseException {
        List<String> scoreList = movieUtils.getResult(
                apiService.getKMDbBydocIds(
                        reviewRepository.findHighestScoreWithDocId(PageRequest.of(0, PAGE_SIZE))
                )
        );

        if (scoreList.size() < PAGE_SIZE) {
            String response = apiService.getLatestmovies(PAGE_SIZE - scoreList.size());
            scoreList.addAll(movieUtils.getResult(response));
        }
        return scoreList;
    }

    private List<String> getMoviesWithHighestScoreByTag(String tag) throws IOException, ParseException {
        List<String> tagScore = movieUtils.getResult(
                apiService.getKMDbBydocIds(
                        reviewRepository.findDocIdsByTagWithHighestScore(tag, PageRequest.of(0, PAGE_SIZE))
                )
        );

        return tagScore;
    }

    private List<String> getMoviesWithMostReviewsByTag(String tag) throws IOException, ParseException {
        List<String> tagReview = movieUtils.getResult(
                apiService.getKMDbBydocIds(
                        reviewRepository.findDocIdsByTagWithMostReviews(tag, PageRequest.of(0, PAGE_SIZE))
                )
        );

        return tagReview;
    }

    private List<String> getMoviesWithHighestScoreByGenre(String genre) throws IOException, ParseException {
        List<String> genreScore = movieUtils.getResult(
                apiService.getKMDbBydocIds(
                        reviewRepository.findHighestScoreWithGenre(genre, PageRequest.of(0, PAGE_SIZE))
                )
        );

        if (genreScore.size() < PAGE_SIZE) {
            String response = apiService.getGenremovies(genre, PAGE_SIZE - genreScore.size());
            genreScore.addAll(movieUtils.getResult(response));
        }
        return genreScore;
    }

    private List<String> getMoviesWithMostReviewsByGenre(String genre) throws IOException, ParseException {
        List<String> genreReview = movieUtils.getResult(
                apiService.getKMDbBydocIds(
                        reviewRepository.findMostReviewsWithGenre(genre, PageRequest.of(0, PAGE_SIZE))
                )
        );

        if (genreReview.size() < PAGE_SIZE) {
            String response = apiService.getGenremovies(genre, PAGE_SIZE - genreReview.size());
            genreReview.addAll(movieUtils.getResult(response));
        }
        return genreReview;
    }



    public Map<String, List<String>> getMainPage() {
        return this.mainMap;
    }
}
