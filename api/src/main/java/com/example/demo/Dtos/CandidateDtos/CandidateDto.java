package com.example.demo.Dtos.CandidateDtos;

public class CandidateDto {
    private Long id;
    private String name;
    private String email;
    private Double score;

    public CandidateDto() {
    }

    public CandidateDto(Long id, String name, String email, Double score) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.score = score;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }
}