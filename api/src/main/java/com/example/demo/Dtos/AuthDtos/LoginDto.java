package com.example.demo.Dtos.AuthDtos;

public class LoginDto {
    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmial(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}