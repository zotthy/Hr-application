package com.example.demo.Mappers;

import com.example.demo.Entity.Recruitment;
import com.example.demo.Dtos.RecruitmentDTO;
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
        dto.setUser(UserMapper.toDTO(entity.getUser()));

        if (entity.getApplications() != null) {
            dto.setApplications(entity.getApplications().stream()
                .map(CandidateApplicationMapper::toDTO)
                .collect(Collectors.toList()));
        }

        return dto;
    }
}