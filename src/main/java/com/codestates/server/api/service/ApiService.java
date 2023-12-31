package com.codestates.server.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ApiService {
    @Autowired
    RestTemplate restTemplate;
    @Value("${api.key}")
    private String kmdb_key;
    @Value("${kobis.key}")
    private String kobis_key;
    @Value("${tmdb.key}")
    private String tmdb_key;

    private final String KMDB_URL = "https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp";
    private final String KOBIS_URL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json";
    private final String TMDB_SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
    private final String TMDB_VIDEO_URL = "https://api.themoviedb.org/3/movie/{movieID}/videos";
    private final String TMDB_IMAGE_URL = "https://api.themoviedb.org/3/movie/{movieID}/images";


    public String getTMDbId(String title,String repRlsDate) {
        URI uri = UriComponentsBuilder.fromUriString(TMDB_SEARCH_URL)
                .queryParam("api_key", tmdb_key)
                .queryParam("query", title)
                .queryParam("include_adult", true)
                .queryParam("language", "ko")
                .queryParam("page", 1)
                .queryParam("primary_release_year", repRlsDate)
                .build()
                .toUri();

        return executeGetRequest(uri);
    }

    public String getTMDbImage(String movieId) {
        URI uri = UriComponentsBuilder.fromUriString(TMDB_IMAGE_URL)
                .queryParam("api_key", tmdb_key)
                .buildAndExpand(movieId)
                .toUri();

        return executeGetRequest(uri);
    }

    public String getTMDbVideo(String movieId) {
        URI uri = UriComponentsBuilder.fromUriString(TMDB_VIDEO_URL)
                .queryParam("api_key", tmdb_key)
                .queryParam("language", "ko")
                .buildAndExpand(movieId)
                .toUri();

        return executeGetRequest(uri);
    }


    public String getKMDbBydocId(String docid) {
        String movieId = docid.substring(0, 1);
        String movieSeq = docid.substring(1);
        URI uri = UriComponentsBuilder.fromUriString(KMDB_URL)
                .queryParam("collection", "kmdb_new2")
                .queryParam("ServiceKey", kmdb_key)
                .queryParam("movieId", movieId)
                .queryParam("movieSeq", movieSeq)
                .build()
                .toUri();

        return executeGetRequest(uri);
    }

    public List<String> getKMDbBydocIds(List<String> docids) {
        List<String> movies = new ArrayList<>();
        for (String docid : docids) {
            String movieId = docid.substring(0, 1);
            String movieSeq = docid.substring(1);
            URI uri = UriComponentsBuilder.fromUriString(KMDB_URL)
                    .queryParam("collection", "kmdb_new2")
                    .queryParam("ServiceKey", kmdb_key)
                    .queryParam("movieId", movieId)
                    .queryParam("movieSeq", movieSeq)
                    .build()
                    .toUri();
            movies.add(executeGetRequest(uri));
        }
        return movies;
    }

    public String getKMDbByQuery(String keyword) {
        URI uri = UriComponentsBuilder.fromUriString(KMDB_URL)
                .queryParam("collection", "kmdb_new2")
                .queryParam("ServiceKey", kmdb_key)
                .queryParam("query", keyword)
                .queryParam("sort", "RANK,1")
                .queryParam("listCount", 20)
                .build()
                .encode()
                .toUri();

        return executeGetRequest(uri);
    }

    public String getKMDbByTitle(String title) {
        URI uri = UriComponentsBuilder.fromUriString(KMDB_URL)
                .queryParam("collection", "kmdb_new2")
                .queryParam("ServiceKey", kmdb_key)
                .queryParam("sort", "repRlsDate,1")
                .queryParam("listCount", 1)
                .queryParam("title", title)
                .build()
                .encode()
                .toUri();

        return executeGetRequest(uri);
    }

    public String getBoxOffice()  {
        URI uri = UriComponentsBuilder.fromUriString(KOBIS_URL)
                .queryParam("key", kobis_key)
                .queryParam("targetDt", LocalDate.now().minusDays(1).format(DateTimeFormatter.ofPattern("YYYYMMdd")))
                .build()
                .toUri();

        return executeGetRequest(uri);
    }


    public String getLatestmovies(int count) {
        URI uri = UriComponentsBuilder.fromUriString(KMDB_URL)
                .queryParam("collection", "kmdb_new2")
                .queryParam("ServiceKey", kmdb_key)
                .queryParam("releaseDts", LocalDate.now().minusMonths(1).format(DateTimeFormatter.ofPattern("YYYYMMdd")))
                .queryParam("listCount", count)
                .build()
                .toUri();

        return executeGetRequest(uri);
    }

    public String getGenremovies(String genre, int count) {
        URI uri = UriComponentsBuilder.fromUriString(KMDB_URL)
                .queryParam("collection", "kmdb_new2")
                .queryParam("ServiceKey", kmdb_key)
                .queryParam("sort", "repRlsDate,1")
                .queryParam("listCount", count)
                .queryParam("genre", genre)
                .build()
                .encode()
                .toUri();

        return executeGetRequest(uri);
    }

    private String executeGetRequest(URI uri) {
        return restTemplate.getForObject(uri, String.class);
    }
}
