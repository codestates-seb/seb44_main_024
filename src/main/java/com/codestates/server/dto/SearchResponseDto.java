package com.codestates.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SearchResponseDto<T> {
    T movie;
    T recommended_movies;
}
