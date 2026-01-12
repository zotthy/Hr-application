package com.example.demo.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.*;

import com.example.demo.Dtos.AuthDtos.LoginDto;
import com.example.demo.Dtos.AuthDtos.RegisterDto;
import com.example.demo.Dtos.AuthDtos.ResponseToken;

@CrossOrigin
@RestController
@RequestMapping("/account/")
public class SecurityController {

    private final AuthenticationManager authenticationManager;
    private final AuthService authService;
    private final JwtService jwtService;

    @Autowired
    public SecurityController(AuthService authService, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.authService = authService;
        this.jwtService = jwtService;
    }
    
    @PostMapping("/register")
    public ResponseEntity<String> registerAdmin(@RequestBody RegisterDto registerDto) {
        return ResponseEntity.ok(authService.register(registerDto));
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseToken> loginAdmin(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String email = authentication.getName();
        
        String token  = jwtService.generateToken(email);
    
        ResponseToken responseToken = new ResponseToken("Token generated successfully",token);
        
        return ResponseEntity.ok(responseToken);

    }
}