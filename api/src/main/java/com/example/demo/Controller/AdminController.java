package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Dtos.RecruitmentDTO;
import com.example.demo.Dtos.RecruitmentListDTO;
import com.example.demo.Service.RecruitmentService;

@CrossOrigin
@RestController()
@RequestMapping("/admin")
public class AdminController {
    private final RecruitmentService recruitmentService;

    @Autowired
    public AdminController(RecruitmentService recruitmentService) {
        this.recruitmentService = recruitmentService;
    }

    @PostMapping("/createRecruitment")
    public ResponseEntity<String> createRecruitment(@RequestBody RecruitmentDTO recruitmentDTO,
            @AuthenticationPrincipal UserDetails principal) {
        recruitmentService.createRecruitment(recruitmentDTO, principal.getUsername());
        return ResponseEntity.ok("Recruitment created successfully with title: " + recruitmentDTO.getTitle());
    }

    @GetMapping("/recruitment/{id}")
    public ResponseEntity<RecruitmentListDTO> getRecruitmentById(@PathVariable Long id,
            @AuthenticationPrincipal UserDetails principal) {
        RecruitmentListDTO recruitmentDTO = recruitmentService.getRecruitmentById(id, principal.getUsername());
        return ResponseEntity.ok(recruitmentDTO);
    }

    @GetMapping("/recruitment/{id}/candidates")
    public ResponseEntity<RecruitmentDTO> getRecruitmentByIdCandidate(@PathVariable Long id,
            @AuthenticationPrincipal UserDetails principal) {
        RecruitmentDTO recruitmentDTO = recruitmentService.getRecruitmentByIdWithCanidatesDetails(id, principal.getUsername());
        return ResponseEntity.ok(recruitmentDTO);
    }

    @GetMapping("/recruitments/{status}")
    public ResponseEntity<List<RecruitmentDTO>> openRecruitment(@AuthenticationPrincipal UserDetails principal,@PathVariable String status) {
        return ResponseEntity.ok(recruitmentService.getRecruitmentsByStatusAndEmail(status, principal.getUsername()));
    }

    @GetMapping("/proces-data")
    public ResponseEntity<String> processData() {
        return ResponseEntity.ok("Data processed successfully");
    }

}