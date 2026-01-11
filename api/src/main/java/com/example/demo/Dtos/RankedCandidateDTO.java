package com.example.demo.Dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RankedCandidateDTO(
    String identifier,
    double score
) {}