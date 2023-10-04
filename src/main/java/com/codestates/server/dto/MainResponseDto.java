package com.codestates.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MainResponseDto<T> {
    private T boxOffice;
    private T mostReview;
    private T topScore;
}