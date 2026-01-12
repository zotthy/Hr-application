package com.example.demo.Dtos.RecruitemntDtos;

import java.time.LocalDateTime;
import java.util.List;

import com.example.demo.Dtos.CandidateDtos.CandidateApplicationDTO;
import com.example.demo.Dtos.UserDtos.UserDTO;

public class RecruitmentDTO {
    private Long id;
    private String recruitmentIdString;
    private String title;
    private String description;
    private String status;
    private LocalDateTime createdAt;
    private UserDTO user;
    private List<CandidateApplicationDTO> applications;

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
    public UserDTO getUser() { return user; }
    public void setUser(UserDTO user) { this.user = user; }
    public List<CandidateApplicationDTO> getApplications() { return applications; }
    public void setApplications(List<CandidateApplicationDTO> applications) { this.applications = applications; }
}