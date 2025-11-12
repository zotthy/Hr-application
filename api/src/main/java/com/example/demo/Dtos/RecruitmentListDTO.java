package com.example.demo.Dtos;


import java.time.LocalDateTime;

public class RecruitmentListDTO {
    private Long id;
    private String recruitmentIdString;
    private String title;
    private String description;
    private String status;
    private LocalDateTime createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getRecruitmentIdString() { return recruitmentIdString; }
    public void setRecruitmentIdString(String recruitmentIdString) { this.recruitmentIdString = recruitmentIdString; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}