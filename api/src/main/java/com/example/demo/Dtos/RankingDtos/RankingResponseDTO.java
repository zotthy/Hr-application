package com.example.demo.Dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RankingResponseDTO(
    @JsonProperty("ranked_candidates")
    List<RankedCandidateDTO> rankedCandidates
) {}