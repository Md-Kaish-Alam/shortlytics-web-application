package com.backend.shortlytics.controller;

import com.backend.shortlytics.dtos.LoginRequest;
import com.backend.shortlytics.dtos.RegisterRequest;
import com.backend.shortlytics.dtos.RegisterResponse;
import com.backend.shortlytics.models.User;
import com.backend.shortlytics.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private UserService userService;

    @PostMapping("/public/register")
    public ResponseEntity<RegisterResponse> registerUser(@RequestBody RegisterRequest registerRequest) {
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(registerRequest.getPassword());
        user.setEmail(registerRequest.getEmail());
        user.setRole("ROLE_USER");

        User savedUser = userService.registerUser(user);
        RegisterResponse response = new RegisterResponse();
        response.setMessage("User Registered Successfully.");
        response.setUser(savedUser);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/public/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.authenticateUser(loginRequest));
    }
}
