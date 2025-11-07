package com.example.demo.Mappers;

import com.example.demo.Dtos.RegisterDto;
import com.example.demo.Dtos.UserDTO;
import com.example.demo.Entity.User;

public class UserMapper {

    public static UserDTO toDTO(User user) {
        if (user == null) return null;
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        return dto;
    }

    public static User toEntity(UserDTO dto) {
        if (dto == null) return null;
        User user = new User();
        return user;
    }

    public static User toEntityFromRegister(RegisterDto registerDto) {
        if (registerDto == null) return null;
        User user = new User();
        user.setName(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(registerDto.getPassword());
        user.setRoles(registerDto.getRole());
        return user;
    }
}