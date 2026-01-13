package com.example.demo.Mappers;

import com.example.demo.Entity.Recruitment;
import com.example.demo.Dtos.RecruitemntDtos.RecruitmentDTO;
import com.example.demo.Dtos.RecruitemntDtos.RecruitmentListDTO;

import java.util.stream.Collectors;

public class RecruitmentMapper {

    public static RecruitmentDTO toDTO(Recruitment entity) {
        if (entity == null) return null;

        RecruitmentDTO dto = new RecruitmentDTO();
        dto.setId(entity.getId());
        dto.setRecruitmentIdString(entity.getRecruitmentIdString());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setStatus(entity.getStatus());
        dto.setCreatedAt(entity.getCreatedAt());
        
        dto.setLocation(entity.getLocation());
        dto.setSalaryMin(entity.getSalaryMin());
        dto.setSalaryMax(entity.getSalaryMax());
        dto.setCurrency(entity.getCurrency());
        dto.setContractType(entity.getContractType());
        dto.setExperienceLevel(entity.getExperienceLevel());
        // -------------------

        if (entity.getUser() != null) {
            dto.setUser(UserMapper.toDTO(entity.getUser()));
        }

        if (entity.getApplications() != null) {
            dto.setApplications(entity.getApplications().stream()
                .map(CandidateApplicationMapper::toDTO)
                .collect(Collectors.toList()));
        }

        return dto;
    }

    public static Recruitment toEntity(RecruitmentDTO dto) {
        if (dto == null) return null;

        Recruitment entity = new Recruitment();
        entity.setId(dto.getId());
        entity.setRecruitmentIdString(dto.getRecruitmentIdString());
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setStatus(dto.getStatus());
        entity.setCreatedAt(dto.getCreatedAt());
        
        entity.setLocation(dto.getLocation());
        entity.setSalaryMin(dto.getSalaryMin());
        entity.setSalaryMax(dto.getSalaryMax());
        entity.setCurrency(dto.getCurrency() != null ? dto.getCurrency() : "PLN");
        entity.setContractType(dto.getContractType());
        entity.setExperienceLevel(dto.getExperienceLevel());

        return entity;
    }
    public static RecruitmentListDTO toDTOList(Recruitment entity) {
        if (entity == null) return null;

        RecruitmentListDTO dto = new RecruitmentListDTO();
        dto.setId(entity.getId());
        dto.setRecruitmentIdString(entity.getRecruitmentIdString());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setStatus(entity.getStatus());

        return dto;
    }
    public static RecruitmentListDTO toListDTO(Recruitment entity) {
        if (entity == null) return null;

        RecruitmentListDTO dto = new RecruitmentListDTO();
        dto.setId(entity.getId());
        dto.setRecruitmentIdString(entity.getRecruitmentIdString());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setStatus(entity.getStatus());
        dto.setLocation(entity.getLocation());
        dto.setSalaryMin(entity.getSalaryMin());
        dto.setSalaryMax(entity.getSalaryMax());
        dto.setCurrency(entity.getCurrency());
        dto.setContractType(entity.getContractType());
        dto.setExperienceLevel(entity.getExperienceLevel());
        
        if (entity.getUser() != null) {
            dto.setRecruiterName(entity.getUser().getName());
        }

        return dto;
    }
}