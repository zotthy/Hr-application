package com.example.demo.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.CandidateApplication;

public interface  CandidateRepository extends JpaRepository<CandidateApplication, Long> {
    List<CandidateApplication> findByRecruitmentId(Long recruitmentId);
}