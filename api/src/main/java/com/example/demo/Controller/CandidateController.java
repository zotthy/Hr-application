package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Dtos.CandidateDtos.CandidateApplicationDTO;
import com.example.demo.Dtos.RecruitemntDtos.RecruitmentListDTO;
import com.example.demo.Service.CandidateService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@CrossOrigin
@RestController()
@RequestMapping("/candidate")
public class CandidateController {

    private final CandidateService candidateService;

    @Autowired
    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @GetMapping("/recruitments-to-apply")
    public ResponseEntity<Page<RecruitmentListDTO>> getAllRecruitmentsToApply(
            @PageableDefault(size = 10, page = 0) Pageable pageable) {
        Page<RecruitmentListDTO> recruitments = candidateService.getAvailableRecruitments(pageable);
        return ResponseEntity.ok(recruitments);
    }

    @GetMapping("/search-recruitments")
    public ResponseEntity<Page<RecruitmentListDTO>> searchRecruitment(
            @PageableDefault(size = 10, page = 0) Pageable pageable,
            @RequestParam String keyword) {

        Page<RecruitmentListDTO> recruitments = candidateService.searchRecruitments(keyword, pageable);

        return ResponseEntity.ok(recruitments);
    }

    @GetMapping("/recruitments-to-apply/{id}")
    public ResponseEntity<RecruitmentListDTO> getRecruitmentDetails(@PathVariable Long id) {
        RecruitmentListDTO recruitment = candidateService.getRecruitmentDetails(id);
        return ResponseEntity.ok(recruitment);
    }

    @PostMapping("/apply-to-recruitment/{recruitmentId}")
    public ResponseEntity<String> applyToRecruitment(@PathVariable Long recruitmentId,
            @RequestBody CandidateApplicationDTO applicationDTO) {
        candidateService.applyToRecruitment(recruitmentId, applicationDTO);
        return ResponseEntity.ok("Application submitted successfully");
    }

}