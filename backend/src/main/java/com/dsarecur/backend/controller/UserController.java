package com.dsarecur.backend.controller;

import com.dsarecur.backend.model.Response;
import com.dsarecur.backend.model.Users;
import com.dsarecur.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Response<Users> registerUser(@RequestBody Users user) {
        Users savedUser = userService.saveUser(user);
        return new Response<>(savedUser, "User created successfully", HttpStatus.OK);
    }

    @GetMapping("/")
    public String home(HttpServletRequest request) {
        return "get api hit   " ;
    }
}
