package com.example.demo.Entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import java.util.Objects;


@Entity
@Table(name = "recruitments")
public class Recruitment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String recruitmentIdString;

    @Column(nullable = false)
    private String title;

    @Lob 
    private String description;

    @Column(nullable = false)
    private String status;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "recruitment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CandidateApplication> applications;


    public Recruitment() {
    }

    public Recruitment(Long id, String recruitmentIdString, String title, String description, String status, LocalDateTime createdAt, User user, List<CandidateApplication> applications) {
        this.id = id;
        this.recruitmentIdString = recruitmentIdString;
        this.title = title;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
        this.user = user;
        this.applications = applications;
    }

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

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<CandidateApplication> getApplications() {
        return this.applications;
    }

    public void setApplications(List<CandidateApplication> applications) {
        this.applications = applications;
    }

    public Recruitment id(Long id) {
        setId(id);
        return this;
    }

    public Recruitment recruitmentIdString(String recruitmentIdString) {
        setRecruitmentIdString(recruitmentIdString);
        return this;
    }

    public Recruitment title(String title) {
        setTitle(title);
        return this;
    }

    public Recruitment description(String description) {
        setDescription(description);
        return this;
    }

    public Recruitment status(String status) {
        setStatus(status);
        return this;
    }

    public Recruitment createdAt(LocalDateTime createdAt) {
        setCreatedAt(createdAt);
        return this;
    }

    public Recruitment user(User user) {
        setUser(user);
        return this;
    }

    public Recruitment applications(List<CandidateApplication> applications) {
        setApplications(applications);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Recruitment)) {
            return false;
        }
        Recruitment recruitment = (Recruitment) o;
        return Objects.equals(id, recruitment.id) && Objects.equals(recruitmentIdString, recruitment.recruitmentIdString) && Objects.equals(title, recruitment.title) && Objects.equals(description, recruitment.description) && Objects.equals(status, recruitment.status) && Objects.equals(createdAt, recruitment.createdAt) && Objects.equals(user, recruitment.user) && Objects.equals(applications, recruitment.applications);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, recruitmentIdString, title, description, status, createdAt, user, applications);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", recruitmentIdString='" + getRecruitmentIdString() + "'" +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", status='" + getStatus() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", user='" + getUser() + "'" +
            ", applications='" + getApplications() + "'" +
            "}";
    }
    
}