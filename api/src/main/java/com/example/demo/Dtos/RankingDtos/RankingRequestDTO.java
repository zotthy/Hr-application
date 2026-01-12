package com.example.demo.Dtos;

import java.util.List;

public record RankingRequestDTO(
    List<CandidateFeaturesDTO> candidates
) {}