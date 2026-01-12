package com.example.demo.Dtos.RankingDtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RankedCandidateDTO(
    String identifier,
    double score
) {}