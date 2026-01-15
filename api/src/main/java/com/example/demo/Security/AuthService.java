package com.example.demo.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Dtos.AuthDtos.RegisterDto;
import com.example.demo.Dtos.UserDtos.UserDTO;
import com.example.demo.Entity.User;
import com.example.demo.Mappers.UserMapper;
import com.example.demo.Repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    private static final String ROLE_ADMIN = "ADMIN";

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public String register(RegisterDto registerDto) {
        if(userRepository.existsByEmail(registerDto.getEmail())) {
            throw new RuntimeException("Username is already taken!");
        }
        else {
            registerDto.setRole(ROLE_ADMIN);
            registerDto.setPassword(encoder.encode(registerDto.getPassword()));
            userRepository.save(UserMapper.toEntityFromRegister(registerDto));
        }
        return "registered successfully!";
    }

    public UserDTO getUserProfile(String username) {
        User foundUser = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserMapper.toDTO(foundUser);
        
    }
}