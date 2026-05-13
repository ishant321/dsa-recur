package com.dsarecur.backend.dto;

import org.springframework.http.HttpStatus;

public class Response<T> {
    private T data;
    private String message;
    private HttpStatus status;
    private String error;

    public Response(T data, String message, HttpStatus status) {
        this.data = data;
        this.message = message;
        this.status = status;
    }

    public Response(T data, String message, HttpStatus status, String error) {
        this.data = data;
        this.message = message;
        this.status = status;
        this.error = error;
    }

    public T getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getError() {
        return error;
    }
}