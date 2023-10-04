package com.codestates.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
@AllArgsConstructor
public class PageResponseDto<T> {
    T movie;
    T recommended_movies;
    private PageInfo pageInfo;

    public PageResponseDto(T movie, T recommended_movies, Page page){
        this.movie = movie;
        this.recommended_movies = recommended_movies;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
