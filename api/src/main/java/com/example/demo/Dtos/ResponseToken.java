package com.example.demo.Dtos;

public class ResponseToken {
    private String message;
    private String token;

    public ResponseToken(String token,String message) {
        this.token = token;
        this.message = message;
    }

    public void setToken(String token) {
        this.token = token;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getMessage() {
        return message;
    }
    public String getToken() {
        return token;
    }
}