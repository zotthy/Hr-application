package com.example.demo.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;

import com.example.demo.Dtos.CandidateFeaturesDTO;
import com.example.demo.Dtos.RankedCandidateDTO;
import com.example.demo.Dtos.RankingRequestDTO;
import com.example.demo.Dtos.RankingResponseDTO;
import com.example.demo.Dtos.RecruitmentDTO;
import com.example.demo.Dtos.RecruitmentListDTO;
import com.example.demo.Entity.CandidateApplication;
import com.example.demo.Entity.Recruitment;
import com.example.demo.Entity.User;
import com.example.demo.Excepion.RecruitmentNotNullException;
import com.example.demo.Excepion.ResourceNotFoundException;
import com.example.demo.Excepion.UserNotFoundException;
import com.example.demo.Repository.CandidateRepository;
import com.example.demo.Repository.RecruitmentRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Mappers.RecruitmentMapper;



@Service
public class RecruitmentService {

    private final RecruitmentRepository recruitmentRepository;
    private final UserRepository userRepository;
    private final CandidateRepository candidateRepository;
    private final WebClient webClient;

    @Autowired
    public RecruitmentService(RecruitmentRepository recruitmentRepository, WebClient.Builder webClientBuilder, CandidateRepository candidateRepository ,UserRepository userRepository) {
        this.recruitmentRepository = recruitmentRepository;
        this.userRepository = userRepository;
        this.candidateRepository = candidateRepository;
        this.webClient = webClientBuilder.build();
    }

    public void createRecruitment(RecruitmentDTO recruitmentDTO, String email) {
        if (recruitmentDTO == null) {
            throw new RecruitmentNotNullException("Recruitment data cannot be null");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        System.out.println("userId: " + user.getId());

        Recruitment recruitment = RecruitmentMapper.toEntity(recruitmentDTO);

        recruitment.setUser(user);

        recruitmentRepository.save(recruitment);
    }

    public RecruitmentDTO getRecruitmentByIdWithCanidatesDetails(Long id, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Recruitment recruitment = recruitmentRepository.findById(id)
                .orElseThrow(() -> new RecruitmentNotNullException("Recruitment not found"));

        if (!recruitment.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Access denied");
        }

        return RecruitmentMapper.toDTO(recruitment);
    }


    public RecruitmentListDTO getRecruitmentById(Long id, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Recruitment recruitment = recruitmentRepository.findById(id)
                .orElseThrow(() -> new RecruitmentNotNullException("Recruitment not found"));

        if (!recruitment.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Access denied");
        }

        return RecruitmentMapper.toDTOList(recruitment);
    }

    public List<RecruitmentDTO> getRecruitmentsByStatusAndEmail(String status, String username) {
        List<Recruitment> recruitments = recruitmentRepository.findAllByStatusAndUser_Email(
                status.toUpperCase(),
                username);
        if (recruitments.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No recruitments found with status: " + status + " for user: " + username);
        }
        return recruitments.stream()
                .map(RecruitmentMapper::toDTO)
                .toList();
    }



    public void rankedCandidates(Long recruitmentId, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + username));
    
        Recruitment recruitment = recruitmentRepository.findById(recruitmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruitment not found with id: " + recruitmentId));
    
        if (!recruitment.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Access denied: You do not own this recruitment");
        }
    
        List<CandidateApplication> applications = candidateRepository.findByRecruitmentId(recruitmentId);
    
        if (applications.isEmpty()) {
            System.out.println("Brak aplikacji do oceny dla rekrutacji ID: " + recruitmentId);
            return;
        }
    
        List<CandidateFeaturesDTO> featuresList = applications.stream()
                .map(CandidateFeaturesDTO::fromEntity)
                .collect(Collectors.toList());
    
        RankingRequestDTO requestDTO = new RankingRequestDTO(featuresList);
    
        String pythonApiUrl = "http://127.0.0.1:8000/rank";
        System.out.println("Wysyłanie " + featuresList.size() + " kandydatów do AI pod adres: " + pythonApiUrl);
    
        RankingResponseDTO responseDto;
        try {
            responseDto = webClient
                    .post()
                    .uri(pythonApiUrl)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(requestDTO))
                    .retrieve()
                    .bodyToMono(RankingResponseDTO.class)
                    .block();

        } catch (Exception e) {
            System.err.println("BŁĄD KOMUNIKACJI Z SERWEREM PYTHON: " + e.getMessage());
            throw new RuntimeException("Model AI nie odpowiedział poprawnie.");
        }
    
        if (responseDto == null || responseDto.rankedCandidates() == null) {
            throw new RuntimeException("Otrzymano pustą odpowiedź z serwisu rankingowego.");
        }
    
        for (RankedCandidateDTO rankedResult : responseDto.rankedCandidates()) {
            Long candidateId;
            try {
                candidateId = Long.parseLong(rankedResult.identifier());
            } catch (NumberFormatException e) {
                continue;
            }
    
            applications.stream()
                    .filter(app -> app.getId().equals(candidateId))
                    .findFirst()
                    .ifPresent(candidate -> {
                        candidate.setScore(rankedResult.score());
                        candidate.setStatus("RANKED");
                    });
        }
    
        candidateRepository.saveAll(applications);
        System.out.println("Ranking zakończony sukcesem. Zaktualizowano " + applications.size() + " rekordów.");
    }
}