package com.codestates.server.movie.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class Movie {
    @JsonProperty("Data")
    private List<Data> data;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class Data {
        @JsonProperty("Result")
        private List<Result> result;

        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        @ToString
        public static class Result {
            // 여기에 Result 필드의 속성들을 정의합니다.

            @JsonProperty("DOCID")
            private String docId; // 영화 ID
            private String title; // 한글 제목
            private String titleEng; // 영어 제목
            private String repRlsDate; // 개봉 날짜
            private String posters; // 영화 포스터, 여러개라서 잘라서 사용해야 함
            private String stlls; // 영화 스틸컷
            private String runtime; // 상영시간
            private String genre; // 영화 장르
            private String rating; // 관람등급
            private String nation; // 제작국가
            private Plots plots; // 영화 설명
            private Directors directors;
            private Actors actors;
            private Staffs staffs;


            @Getter
            @Setter
            @NoArgsConstructor
            @AllArgsConstructor
            @ToString
            public static class Plots {
                @JsonProperty("plot")
                private List<Plot> plot;

                @Getter
                @Setter
                @NoArgsConstructor
                @AllArgsConstructor
                @ToString
                public static class Plot {
                    private String plotText;
                }
            }


            @Getter
            @Setter
            @NoArgsConstructor
            @AllArgsConstructor
            @ToString
            public static class Directors {
                private List<Director> director;

                @Getter
                @Setter
                @NoArgsConstructor
                @AllArgsConstructor
                @ToString
                public static class Director {
                    private String directorNm;
                }
            }

            @Getter
            @Setter
            @NoArgsConstructor
            @AllArgsConstructor
            @ToString
            public static class Actors {
                private List<Actor> actor;

                @Getter
                @Setter
                @NoArgsConstructor
                @AllArgsConstructor
                @ToString
                public static class Actor {
                    private String actorNm;

//                    @JsonSetter("actorNm")
//                    public void setActorNm(JsonNode jsonNode) {
//                        if (jsonNode.isArray()) {
//                            for (JsonNode node : jsonNode) {
//                                actorNm.add(node.asText());
//                            }
//                        } else {
//                            actorNm.add(jsonNode.asText());
//                        }
//
//                    }
                }
            }

            @Getter
            @Setter
            @NoArgsConstructor
            @AllArgsConstructor
            @ToString
            public static class Staffs {

                private List<Staff> staff;

                @Getter
                @Setter
                @NoArgsConstructor
                @AllArgsConstructor
                @ToString
                public static class Staff {
                    @JsonProperty("staffNm")
                    private String staffNm;
                    @JsonProperty("staffRole")
                    private String staffRole;
                }
            }
        }
    }
}