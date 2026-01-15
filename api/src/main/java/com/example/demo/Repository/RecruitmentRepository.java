package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.demo.Entity.Recruitment;

@Repository
public interface RecruitmentRepository extends JpaRepository<Recruitment, Long> {
    List<Recruitment> findAllByStatusAndUser_Email(String status, String email);
    List<Recruitment> findByStatus(String status);

    Page<Recruitment> findByStatus(String status, Pageable pageable);
    Page<Recruitment> findByTitleContainingIgnoreCaseOrLocationContainingIgnoreCase(
        String titleKeyword, 
        String locationKeyword, 
        Pageable pageable
    );
}