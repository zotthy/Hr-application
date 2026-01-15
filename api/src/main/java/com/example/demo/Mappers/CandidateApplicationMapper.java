package com.example.demo.Mappers;

import com.example.demo.Dtos.CandidateDtos.CandidateApplicationDTO;
import com.example.demo.Entity.CandidateApplication;
import com.example.demo.Entity.Recruitment;

public class CandidateApplicationMapper {

    public static CandidateApplicationDTO toDTO(CandidateApplication entity) {
        if (entity == null) return null;
        CandidateApplicationDTO dto = new CandidateApplicationDTO();

        dto.setId(entity.getId());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setEmail(entity.getEmail());
        dto.setJobId(entity.getJobId());
        dto.setStatus(entity.getStatus());

        dto.setScore(entity.getScore());

        dto.setExperienceYears(entity.getExperienceYears());
        dto.setEducation(entity.getEducation());
        dto.setCertifications(entity.getCertifications());
        dto.setJobRole(entity.getJobRole());
        dto.setSalaryExpectation(entity.getSalaryExpectation());
        dto.setProjectsCount(entity.getProjectsCount());

        dto.setCpp(entity.getCpp());
        dto.setCybersecurity(entity.getCybersecurity());
        dto.setDeepLearning(entity.getDeepLearning());
        dto.setEthicalHacking(entity.getEthicalHacking());
        dto.setJava(entity.getJava());
        dto.setLinux(entity.getLinux());
        dto.setMachineLearning(entity.getMachineLearning());
        dto.setNlp(entity.getNlp());
        dto.setNetworking(entity.getNetworking());
        dto.setPython(entity.getPython());
        dto.setPytorch(entity.getPytorch());
        dto.setReact(entity.getReact());
        dto.setSql(entity.getSql());
        dto.setTensorFlow(entity.getTensorFlow());

        return dto;
    }
    public static CandidateApplication toEntity(CandidateApplicationDTO dto, Recruitment recruitment) {
        if (dto == null) return null;
    
        CandidateApplication entity = new CandidateApplication();
    
        // Ustawianie ID jest ważne, jeśli aktualizujesz istniejącą encję
        entity.setId(dto.getId()); 
        
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setEmail(dto.getEmail());
        entity.setJobId(dto.getJobId());
        entity.setStatus(dto.getStatus());
    
        // Cechy (features)
        entity.setExperienceYears(dto.getExperienceYears());
        entity.setEducation(dto.getEducation());
        entity.setCertifications(dto.getCertifications());
        entity.setJobRole(dto.getJobRole());
        entity.setSalaryExpectation(dto.getSalaryExpectation());
        entity.setProjectsCount(dto.getProjectsCount());
    
        // Umiejętności (skills)
        entity.setCpp(dto.getCpp());
        entity.setCybersecurity(dto.getCybersecurity());
        entity.setDeepLearning(dto.getDeepLearning());
        entity.setEthicalHacking(dto.getEthicalHacking());
        entity.setJava(dto.getJava());
        entity.setLinux(dto.getLinux());
        entity.setMachineLearning(dto.getMachineLearning());
        entity.setNlp(dto.getNlp());
        entity.setNetworking(dto.getNetworking());
        entity.setPython(dto.getPython());
        entity.setPytorch(dto.getPytorch());
        entity.setReact(dto.getReact());
        entity.setSql(dto.getSql());
        entity.setTensorFlow(dto.getTensorFlow());
    
        entity.setRecruitment(recruitment);
    
        return entity;
}
}
