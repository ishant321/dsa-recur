package com.dsarecur.backend.controller;

import com.dsarecur.backend.dto.AuthResponse;
import com.dsarecur.backend.dto.ChangePassword;
import com.dsarecur.backend.dto.Response;
import com.dsarecur.backend.model.Users;
import com.dsarecur.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Response<Users>> registerUser(@RequestBody Users user) {
        Users savedUser = userService.saveUser(user);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new Response<>(savedUser, "User created successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<Response<AuthResponse>> loginUser(@RequestBody Users user) {
        AuthResponse authResponse = userService.verifyUser(user);
        return ResponseEntity
                .ok(new Response<>(authResponse, "User logged in successfully"));
    }

    @PostMapping("/refresh_token")
    public ResponseEntity<Response<Map<String, String>>> refreshToken(@RequestBody Map<String, String> request) {

        String refreshToken = request.get("refreshToken");

        String newAccessToken = userService.refreshAccessToken(refreshToken);

        return ResponseEntity.ok(new Response<>(
                Map.of("accessToken", newAccessToken),
                "Token refreshed successfully"
        ));
    }

    @PostMapping("change_password")
    public ResponseEntity<Response<String>> changePassword(@RequestBody ChangePassword request) {
        userService.updatePassword(request);
        return ResponseEntity.ok(new Response<>("SUCCESS", "Password Updated."));
    }

    @GetMapping("/")
    public ResponseEntity<Response<String>> home(HttpServletRequest request) {
        return ResponseEntity.ok(
                new Response<>("UP", "Service is running")
        );
    }
}
