package com.codestates.server.api.service;

import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
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
    private final String KMDB_URL = "https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp";
    private final String KOBIS_URL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json";

    public String getKMDbBydocId(String docid) throws IOException {
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

    public List<String> getKMDbBydocIds(List<String> docids) throws IOException {
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

    public String getKMDbByQuery(String keyword) throws IOException {
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

    public String getKMDbByTitle(String title) throws IOException {
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

    public String getBoxOffice() throws IOException, ParseException {
        URI uri = UriComponentsBuilder.fromUriString(KOBIS_URL)
                .queryParam("key", kobis_key)
                .queryParam("targetDt", LocalDate.now().minusDays(1).format(DateTimeFormatter.ofPattern("YYYYMMdd")))
                .build()
                .toUri();

        return executeGetRequest(uri);
    }


    public String getLatestmovies(int count) throws IOException {
        URI uri = UriComponentsBuilder.fromUriString(KMDB_URL)
                .queryParam("collection", "kmdb_new2")
                .queryParam("ServiceKey", kmdb_key)
                .queryParam("releaseDts", LocalDate.now().minusMonths(1).format(DateTimeFormatter.ofPattern("YYYYMMdd")))
                .queryParam("listCount", count)
                .build()
                .toUri();

        return executeGetRequest(uri);
    }

    public String getGenremovies(String genre, int count) throws IOException {
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

    private String executeGetRequest(URI uri) throws IOException {
        return restTemplate.getForObject(uri, String.class);
    }
}
