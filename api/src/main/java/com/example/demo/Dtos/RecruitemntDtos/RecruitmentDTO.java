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
    private String location;
    private Integer salaryMin;
    private Integer salaryMax; 
    private String currency = "PLN";
    private String contractType; 
    private String experienceLevel;
    private LocalDateTime createdAt;
    private UserDTO user;
    private List<CandidateApplicationDTO> applications;


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRecruitmentIdString() {
        return this.recruitmentIdString;
    }

    public void setRecruitmentIdString(String recruitmentIdString) {
        this.recruitmentIdString = recruitmentIdString;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getSalaryMin() {
        return this.salaryMin;
    }

    public void setSalaryMin(Integer salaryMin) {
        this.salaryMin = salaryMin;
    }

    public Integer getSalaryMax() {
        return this.salaryMax;
    }

    public void setSalaryMax(Integer salaryMax) {
        this.salaryMax = salaryMax;
    }

    public String getCurrency() {
        return this.currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getContractType() {
        return this.contractType;
    }

    public void setContractType(String contractType) {
        this.contractType = contractType;
    }

    public String getExperienceLevel() {
        return this.experienceLevel;
    }

    public void setExperienceLevel(String experienceLevel) {
        this.experienceLevel = experienceLevel;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public UserDTO getUser() {
        return this.user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public List<CandidateApplicationDTO> getApplications() {
        return this.applications;
    }

    public void setApplications(List<CandidateApplicationDTO> applications) {
        this.applications = applications;
    }
    
}