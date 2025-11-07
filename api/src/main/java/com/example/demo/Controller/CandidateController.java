package com.example.demo.Controller;

import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController()
@RequestMapping("/candidate")
public class CandidateController {
    
    @PostMapping("/addmycandidacy")
    public String addMyCandidacy(){
        return "Candidacy added successfully!";
    } 

}