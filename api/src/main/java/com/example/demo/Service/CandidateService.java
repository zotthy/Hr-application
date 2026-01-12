package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.Dtos.CandidateApplicationDTO;
import com.example.demo.Dtos.RecruitemntDtos.RecruitmentDTO;
import com.example.demo.Entity.CandidateApplication;
import com.example.demo.Entity.Recruitment;
import com.example.demo.Excepion.ResourceNotFoundException;
import com.example.demo.Mappers.CandidateApplicationMapper;
import com.example.demo.Mappers.RecruitmentMapper;
import com.example.demo.Repository.CandidateRepository;
import com.example.demo.Repository.RecruitmentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class CandidateService {

    private final CandidateRepository candidateRepository;
    private final RecruitmentRepository recruitmentRepository;
    

    @Autowired
    public CandidateService(CandidateRepository candidateRepository, RecruitmentRepository recruitmentRepository) {
        this.candidateRepository = candidateRepository;
        this.recruitmentRepository = recruitmentRepository;
    }
    public Page<RecruitmentDTO> getAvailableRecruitments(Pageable pageable) {
        Page<Recruitment> openRecruitmentsPage = recruitmentRepository.findByStatus("OPEN", pageable);
    
        if (openRecruitmentsPage.isEmpty()) {
            throw new ResourceNotFoundException("No open recruitments found");
        }
    
        // Mapujemy Page<Entity> na Page<DTO>
        return openRecruitmentsPage.map(RecruitmentMapper::toDTO);
    }
    

public void applyToRecruitment(Long recruitmentId, CandidateApplicationDTO applicationDTO) {
    Recruitment recruitment = recruitmentRepository.findById(recruitmentId)
            .orElseThrow(() -> new ResourceNotFoundException("Recruitment not found"));
    CandidateApplication entity = CandidateApplicationMapper.toEntity(applicationDTO, recruitment);
    candidateRepository.save(entity);
}

}