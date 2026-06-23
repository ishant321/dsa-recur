package com.dsarecur.backend.controller;

import com.dsarecur.backend.dto.AuthResponse;
import com.dsarecur.backend.dto.Response;
import com.dsarecur.backend.model.Users;
import com.dsarecur.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Response<Users> registerUser(@RequestBody Users user) {
        Users savedUser = userService.saveUser(user);
        return new Response<>(savedUser, "User created successfully");
    }

    @PostMapping("/login")
    public Response<AuthResponse> loginUser(@RequestBody Users user) {
        AuthResponse authResponse = userService.verifyUser(user);
        return new Response<>(authResponse, "User logged in successfully");
    }

    @PostMapping("/refresh_token")
    public Response<Map<String, String>> refreshToken(@RequestBody Map<String, String> request) {

        String refreshToken = request.get("refreshToken");

        String newAccessToken = userService.refreshAccessToken(refreshToken);

        return new Response<>(
                Map.of("accessToken", newAccessToken),
                "Token refreshed successfully"
        );
    }

    @GetMapping("/")
    public String home(HttpServletRequest request) {
        return "get api hit   " ;
    }
}
