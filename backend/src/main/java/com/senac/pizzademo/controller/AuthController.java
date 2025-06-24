package com.senac.pizzademo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        if ("admin".equals(username) && "senha123".equals(password)) {
            Map<String, String> response = new HashMap<>();
            response.put("token", "fake-jwt-token");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Usuário ou senha inválidos");
            return ResponseEntity.status(401).body(response);
        }
    }
}
