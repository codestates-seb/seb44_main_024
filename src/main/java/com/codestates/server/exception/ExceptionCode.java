package com.codestates.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    REVIEW_NOT_FOUNT(404, "Review not found"),
    REVIEW_FORBIDDEN(403, "Permission denied"),
    MEMBER_FORBIDDEN(403, "Permission denied"),
    PAGE_CANNOT_LOAD(404, "The page cannot be loaded."),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}