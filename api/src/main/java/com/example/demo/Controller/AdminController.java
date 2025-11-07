package com.example.demo.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Dtos.RecruitmentDTO;

@RestController()
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public ResponseEntity<String> getAdminDashboard() {
        return ResponseEntity.ok("Welcome to the Admin Dashboard!");
    }

    @PostMapping("/createRecruitment")
    public ResponseEntity<String> createReport(@RequestBody RecruitmentDTO recruitmentDTO) {
        return ResponseEntity.ok("Recruitment created successfully with title: " + recruitmentDTO.getTitle());
    }

    @GetMapping("/viewRecruitments")
    public ResponseEntity<String> viewRecruitments() {
        return ResponseEntity.ok("List of recruitments displayed successfully!");
    }
}