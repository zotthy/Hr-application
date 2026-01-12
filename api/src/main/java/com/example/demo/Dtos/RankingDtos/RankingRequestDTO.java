package com.example.demo.Dtos.RankingDtos;

import java.util.List;

import com.example.demo.Dtos.CandidateDtos.CandidateFeaturesDTO;

public record RankingRequestDTO(
    List<CandidateFeaturesDTO> candidates
) {}