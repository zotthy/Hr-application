package com.example.demo.Excepion;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Map<String, String>> handleResourceNotFoundException(ResourceNotFoundException ex) {
        
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("status", "NOT_FOUND");
        errorResponse.put("message", ex.getMessage());
        
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> obsluzUnikalnyBlad(DataIntegrityViolationException ex) {

        if (ex.getMessage().contains("unique") || ex.getMessage().contains("duplicate")) {
            return Map.of("błąd", "Ten identyfikator już istnieje. Użyj innego.");
        }

        return Map.of("błąd", "Błąd danych. Istnieje konflikt z istniejącymi danymi.");
    }
}
