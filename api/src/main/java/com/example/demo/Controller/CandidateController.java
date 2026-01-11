package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Dtos.CandidateApplicationDTO;
import com.example.demo.Dtos.RecruitmentDTO;
import com.example.demo.Service.CandidateService;

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
    public ResponseEntity<List<RecruitmentDTO>> getAllRecruitmentsToApply() {
        List<RecruitmentDTO> recruitments = candidateService.getAvailableRecruitments();
        return ResponseEntity.ok(recruitments);
    }

    @PostMapping("/apply-to-recruitment/{recruitmentId}")
    public ResponseEntity<?> applyToRecruitment(@PathVariable Long recruitmentId,
            @RequestBody CandidateApplicationDTO applicationDTO) {
        candidateService.applyToRecruitment(recruitmentId, applicationDTO);
        return ResponseEntity.ok("Applied to recruitment with ID: " + recruitmentId);
    }

}