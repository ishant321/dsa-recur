package com.dsarecur.backend.service;

import com.dsarecur.backend.dto.AuthResponse;
import com.dsarecur.backend.dto.ChangePassword;
import com.dsarecur.backend.exception.BadRequestException;
import com.dsarecur.backend.model.Users;
import com.dsarecur.backend.repository.UserRepository;
import com.dsarecur.backend.security.JWTService;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authManager;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Users saveUser(Users user) {
        if (user.getPassword() == null || user.getPassword().length() < 4) {
            throw new IllegalArgumentException("Password must be at least 4 characters long");
        }

        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public AuthResponse verifyUser(Users user) {
        Authentication authentication =
                authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if(authentication.isAuthenticated()) {
            return new AuthResponse(jwtService.generateAccessToken(user), jwtService.generateRefreshToken(user));
        }
        return null;
    }

    public String refreshAccessToken(String refreshToken) {
        return jwtService.getNewAccessToken(refreshToken);
    }

    public void updatePassword(ChangePassword request) {

        // 1. Get current logged-in user (recommended way)
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        Users user = userRepository.findByEmail(email);

        if (user == null) {
            throw new BadRequestException("User not found");
        }

        // 2. Validate old password
        if (!encoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new BadRequestException("Current password is incorrect");
        }

        // 3. Check new password rules
        if (request.getNewPassword() == null || request.getNewPassword().length() < 4) {
            throw new BadRequestException("New password must be at least 4 characters long");
        }

        // 4. Prevent same password reuse
        if (encoder.matches(request.getNewPassword(), user.getPassword())) {
            throw new BadRequestException("New password cannot be same as old password");
        }

        // 5. Update password
        user.setPassword(encoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}
