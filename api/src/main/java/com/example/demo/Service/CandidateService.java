package com.example.demo.Service;

import java.util.List;
import java.util.regex.Pattern;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Dtos.CandidateDtos.CandidateApplicationDTO;
import com.example.demo.Dtos.CandidateDtos.CandidateDtoCv;
import com.example.demo.Dtos.RecruitemntDtos.RecruitmentListDTO;
import com.example.demo.Entity.CandidateApplication;
import com.example.demo.Entity.Filedb;
import com.example.demo.Entity.Recruitment;
import com.example.demo.Excepion.ResourceNotFoundException;
import com.example.demo.Mappers.CandidateApplicationMapper;

import com.example.demo.Mappers.RecruitmentMapper;
import com.example.demo.Repository.CandidateRepository;
import com.example.demo.Repository.FiledbRepository;
import com.example.demo.Repository.RecruitmentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class CandidateService {

    private final CandidateRepository candidateRepository;
    private final RecruitmentRepository recruitmentRepository;
    private final FiledbRepository filedbRepository;
    private final ChatClient chatClient;

    @Autowired
    public CandidateService(CandidateRepository candidateRepository, RecruitmentRepository recruitmentRepository,
            FiledbRepository filedbRepository, ChatClient.Builder builder) {
        this.candidateRepository = candidateRepository;
        this.recruitmentRepository = recruitmentRepository;
        this.filedbRepository = filedbRepository;
        this.chatClient = builder.build();
    }

    public Page<RecruitmentListDTO> getAvailableRecruitments(Pageable pageable) {
        Page<Recruitment> openRecruitmentsPage = recruitmentRepository.findByStatus("OPEN", pageable);

        if (openRecruitmentsPage.isEmpty()) {
            throw new ResourceNotFoundException("No open recruitments found");
        }

        return openRecruitmentsPage.map(RecruitmentMapper::toListDTO);
    }

    public void applyToRecruitment(Long recruitmentId, CandidateApplicationDTO applicationDTO) {
        Recruitment recruitment = recruitmentRepository.findById(recruitmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Recruitment not found"));
        CandidateApplication entity = CandidateApplicationMapper.toEntity(applicationDTO, recruitment);
        candidateRepository.save(entity);
    }

    public void applyToRecruitmentWithFile(Long recruitmentId, CandidateDtoCv candidateDtoCv, MultipartFile file)
        throws Exception {
    Recruitment recruitment = recruitmentRepository.findById(recruitmentId)
            .orElseThrow(() -> new ResourceNotFoundException("Recruitment not found"));

    System.out.println("Processing CV for: " + candidateDtoCv.getFirstName() + " " + candidateDtoCv.getLastName()
            + ", Email: " + candidateDtoCv.getEmail());
    System.out.println("________");

    String originalContent;
    try (PDDocument document = Loader.loadPDF(file.getBytes())) {
        PDFTextStripper stripper = new PDFTextStripper();
        originalContent = stripper.getText(document);
    }

    System.out.println(originalContent);

    String anonymizedContent = originalContent;
    List<String> phrasesToRemove = List.of(candidateDtoCv.getFirstName(), candidateDtoCv.getLastName(),
            candidateDtoCv.getEmail());

    for (String phrase : phrasesToRemove) {
        if (phrase != null && !phrase.isBlank()) {
            anonymizedContent = anonymizedContent.replaceAll("(?i)" + Pattern.quote(phrase), "[REDACTED]");
        }
    }

    System.out.println(anonymizedContent);

    String anonimData = anonymizedContent;

    String systemMessage = """
            Jesteś ekspertem HR. Przeanalizuj tekst CV i przypisz odpowiednie identyfikatory liczbowe dla poniższych pól:

            1. jobRole (Poziom Seniority):
               1: Junior (0-2 lata doświadczenia lub stanowisko młodsze)
               2: Mid (2-5 lat doświadczenia)
               3: Senior (5-10 lat doświadczenia)
               4: Expert (powyżej 10 lat doświadczenia lub rola architekta)

            2. education (Wykształcenie):
               1: Zawodowe
               2: Średnie (Technikum, Liceum)
               3: Licencjat / Inżynier
               4: Magister
               5: Doktorat

            3. salaryExpectation (Oszacuj na podstawie doświadczenia, jeśli nie podano):
               1: < 3500, 2: 3500-5000, 3: 5000-7000, 4: 7000-10000,
               5: 10000-15000, 6: 15000-20000, 7: 20000-30000, 8: > 30000

            4. Umiejętności techniczne (java, python, sql itp.):
               Zwróć 1 jeśli posiada, 0 jeśli brak.

            Wszystkie te pola muszą być typu Integer. Zwróć tylko czysty JSON.
            """;

    CandidateApplication aiExtractedData = chatClient.prompt()
            .system(systemMessage)
            .user(u -> u.text("Oto zanonimizowany tekst CV: {context}")
                    .param("context", anonimData))
            .call()
            .entity(CandidateApplication.class);

    System.out.println(aiExtractedData.toString());

    if (aiExtractedData != null) {
        Filedb fileEntity = new Filedb(
            file.getOriginalFilename(), 
            file.getContentType(), 
            file.getBytes()
        );
        fileEntity = filedbRepository.save(fileEntity);
    
        CandidateApplication finalApplication = new CandidateApplication();
        

        finalApplication.setFirstName(candidateDtoCv.getFirstName());
        finalApplication.setLastName(candidateDtoCv.getLastName());
        finalApplication.setEmail(candidateDtoCv.getEmail());
        finalApplication.setSalaryExpectation(candidateDtoCv.getSalaryExpectation());
        finalApplication.setRecruitment(recruitment);
        finalApplication.setFiledb(fileEntity);
        finalApplication.setStatus("");
        finalApplication.setJobId("");

        finalApplication.setExperienceYears(aiExtractedData.getExperienceYears());
        finalApplication.setEducation(aiExtractedData.getEducation());
        finalApplication.setJobRole(aiExtractedData.getJobRole());
        finalApplication.setCertifications(aiExtractedData.getCertifications());
        finalApplication.setProjectsCount(aiExtractedData.getProjectsCount());

        finalApplication.setJava(aiExtractedData.getJava());
        finalApplication.setPython(aiExtractedData.getPython());
        finalApplication.setSql(aiExtractedData.getSql());
        finalApplication.setCpp(aiExtractedData.getCpp());
        finalApplication.setLinux(aiExtractedData.getLinux());
        finalApplication.setReact(aiExtractedData.getReact());
        finalApplication.setTensorFlow(aiExtractedData.getTensorFlow());
        finalApplication.setPytorch(aiExtractedData.getPytorch());
        finalApplication.setMachineLearning(aiExtractedData.getMachineLearning());
        finalApplication.setDeepLearning(aiExtractedData.getDeepLearning());
        finalApplication.setNlp(aiExtractedData.getNlp());
        finalApplication.setNetworking(aiExtractedData.getNetworking());
        finalApplication.setCybersecurity(aiExtractedData.getCybersecurity());
        finalApplication.setEthicalHacking(aiExtractedData.getEthicalHacking());

        candidateRepository.save(finalApplication);
        
        System.out.println("Zapisano pomyślnie nową aplikację z kompletem skilli!");
    }
}

    public RecruitmentListDTO getRecruitmentDetails(Long id) {
        Recruitment recruitment = recruitmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recruitment not found"));
        return RecruitmentMapper.toListDTO(recruitment);
    }

    public Page<RecruitmentListDTO> searchRecruitments(String keyword, Pageable pageable) {
        Page<Recruitment> recruitmentsPage = recruitmentRepository
                .findByTitleContainingIgnoreCaseOrLocationContainingIgnoreCase(keyword, keyword, pageable);

        return recruitmentsPage.map(RecruitmentMapper::toListDTO);
    }

}