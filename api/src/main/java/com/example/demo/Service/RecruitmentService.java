package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Dtos.RecruitmentDTO;
import com.example.demo.Dtos.RecruitmentListDTO;
import com.example.demo.Entity.Recruitment;
import com.example.demo.Entity.User;
import com.example.demo.Excepion.RecruitmentNotNullException;
import com.example.demo.Excepion.ResourceNotFoundException;
import com.example.demo.Excepion.UserNotFoundException;
import com.example.demo.Repository.RecruitmentRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Mappers.RecruitmentMapper;

@Service
public class RecruitmentService {

    private final RecruitmentRepository recruitmentRepository;
    private final UserRepository userRepository;

    @Autowired
    public RecruitmentService(RecruitmentRepository recruitmentRepository, UserRepository userRepository) {
        this.recruitmentRepository = recruitmentRepository;
        this.userRepository = userRepository;
    }

    public void createRecruitment(RecruitmentDTO recruitmentDTO, String email) {
        if (recruitmentDTO == null) {
            throw new RecruitmentNotNullException("Recruitment data cannot be null");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        System.out.println("userId: " + user.getId());

        Recruitment recruitment = RecruitmentMapper.toEntity(recruitmentDTO);

        recruitment.setUser(user);

        recruitmentRepository.save(recruitment);
    }

    public RecruitmentDTO getRecruitmentByIdWithCanidatesDetails(Long id, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Recruitment recruitment = recruitmentRepository.findById(id)
                .orElseThrow(() -> new RecruitmentNotNullException("Recruitment not found"));

        if (!recruitment.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Access denied");
        }

        return RecruitmentMapper.toDTO(recruitment);
    }


    public RecruitmentListDTO getRecruitmentById(Long id, String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Recruitment recruitment = recruitmentRepository.findById(id)
                .orElseThrow(() -> new RecruitmentNotNullException("Recruitment not found"));

        if (!recruitment.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Access denied");
        }

        return RecruitmentMapper.toDTOList(recruitment);
    }

    public List<RecruitmentDTO> getRecruitmentsByStatusAndEmail(String status, String username) {
        List<Recruitment> recruitments = recruitmentRepository.findAllByStatusAndUser_Email(
                status.toUpperCase(),
                username);
        if (recruitments.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No recruitments found with status: " + status + " for user: " + username);
        }
        return recruitments.stream()
                .map(RecruitmentMapper::toDTO)
                .toList();
    }

}