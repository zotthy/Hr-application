package com.example.demo.Mappers;

import com.example.demo.Dtos.CandidateDto;
import com.example.demo.Entity.CandidateApplication;

public class CandidateMappers {
    public static CandidateDto toDto(CandidateApplication entity) {
        if (entity == null) {
            return null;
        }

        CandidateDto dto = new CandidateDto();
        dto.setId(entity.getId());
        dto.setName(entity.getFirstName() + " " + entity.getLastName());
        dto.setEmail(entity.getEmail());
        dto.setScore(entity.getScore());

        return dto;
    }
}