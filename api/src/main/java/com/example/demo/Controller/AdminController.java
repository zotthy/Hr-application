package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Dtos.RecruitemntDtos.RecruitmentDTO;
import com.example.demo.Dtos.RecruitemntDtos.RecruitmentListDTO;
import com.example.demo.Entity.Filedb;
import com.example.demo.Repository.FiledbRepository;
import com.example.demo.Service.RecruitmentService;

@CrossOrigin
@RestController()
@RequestMapping("/admin")
public class AdminController {
    private final RecruitmentService recruitmentService;
    private final FiledbRepository filedbRepository;

    @Autowired
    public AdminController(RecruitmentService recruitmentService,FiledbRepository filedbRepository) {
        this.filedbRepository=filedbRepository;
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
        RecruitmentDTO recruitmentDTO = recruitmentService.getRecruitmentByIdWithCanidatesDetails(id,
                principal.getUsername());
        return ResponseEntity.ok(recruitmentDTO);
    }
    
    @GetMapping("/recruitments/{status}")
    public ResponseEntity<List<RecruitmentDTO>> openRecruitment(@AuthenticationPrincipal UserDetails principal,
            @PathVariable String status) {
        return ResponseEntity.ok(recruitmentService.getRecruitmentsByStatusAndEmail(status, principal.getUsername()));
    }

    @PostMapping("/recruitments/archive/{id}")
    public ResponseEntity<String> archiveRecruitments(@AuthenticationPrincipal UserDetails principal,
            @PathVariable Long id) {
        recruitmentService.archiveRecruitment(id, principal.getUsername());
        return ResponseEntity.ok("Archived successfully");
    }

    @PostMapping("/recruitment/{id}/rank")
    public ResponseEntity<String> rankCandidates(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails principal) {

        try {
            recruitmentService.rankedCandidates(id, principal.getUsername());

            return ResponseEntity.ok("Ranking completed successfully for recruitment ID: " + id);
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error during ranking: " + e.getMessage());
        }
    }

    @GetMapping("/file/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable("id") Long id, @AuthenticationPrincipal UserDetails principal) {
        System.out.println("Próba pobrania pliku o ID: " + id);
    
        if (id == null) {
            throw new IllegalArgumentException("ID pliku nie może być puste");
        }
    
        Filedb file = filedbRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found with id " + id));
    
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, file.getType())
                .body(file.getData());
    }

}