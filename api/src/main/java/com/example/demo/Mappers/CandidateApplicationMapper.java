package com.example.demo.Mappers;

import com.example.demo.Entity.CandidateApplication;
import com.example.demo.Dtos.CandidateApplicationDTO;

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
}
