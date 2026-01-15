package com.example.demo.Dtos.RecruitemntDtos;

public class RecruitmentListDTO {
    private Long id;
    private String recruitmentIdString;
    private String title;
    private String description;
    private String status;
    private String location;
    private Integer salaryMin;
    private Integer salaryMax;
    private String currency;
    private String contractType;
    private String experienceLevel;
    private String recruiterName;
    private String companyName;

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
    public String getRecruiterName() { return recruiterName; }
    public void setRecruiterName(String recruiterName) { this.recruiterName = recruiterName;}
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
    public String getCompanyName() {
        return this.companyName;
    }
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

}