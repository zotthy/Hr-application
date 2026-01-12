package com.example.demo.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Dtos.CandidateApplicationDTO;
import com.example.demo.Dtos.RecruitemntDtos.RecruitmentDTO;
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
    public ResponseEntity<Page<RecruitmentDTO>> getAllRecruitmentsToApply(
            @PageableDefault(size = 10, page = 0) Pageable pageable) {
        Page<RecruitmentDTO> recruitments = candidateService.getAvailableRecruitments(pageable);
        return ResponseEntity.ok(recruitments);
    }

    @PostMapping("/apply-to-recruitment/{recruitmentId}")
    public ResponseEntity<String> applyToRecruitment(@PathVariable Long recruitmentId,
            @RequestBody CandidateApplicationDTO applicationDTO) {
        candidateService.applyToRecruitment(recruitmentId, applicationDTO);
        return ResponseEntity.ok("Application submitted successfully");
    }

}