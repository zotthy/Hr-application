package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;

public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    


}
