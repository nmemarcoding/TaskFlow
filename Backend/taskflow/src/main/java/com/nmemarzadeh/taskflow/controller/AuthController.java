package com.nmemarzadeh.taskflow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nmemarzadeh.taskflow.dto.UserDto;
import com.nmemarzadeh.taskflow.model.User;
import com.nmemarzadeh.taskflow.service.UserService;
import com.nmemarzadeh.taskflow.util.JwtUtil;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            System.out.println("Received user: " + user.getUsername() + " | Password: " + user.getPassword());
            
            if (user.getPassword() == null || user.getPassword().isBlank()) {
                throw new IllegalArgumentException("Password must not be null or empty");
            }
            
            // Check if email is provided, if not, use username as email for backward compatibility
            if (user.getEmail() == null || user.getEmail().isBlank()) {
                user.setEmail(user.getUsername() + "@example.com");
            }

            if (userService.findByUsername(user.getUsername()).isPresent()) {
                return ResponseEntity.badRequest().body("Username already exists");
            } else if (userService.findByEmail(user.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Email already exists");
            }

            User savedUser = userService.register(user);
            // Convert to DTO before returning
            UserDto userDto = new UserDto(savedUser);
            
            return ResponseEntity.ok(userDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error during registration: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            return userService.findByEmail(user.getEmail())
                    .map(existingUser -> {
                        try {
                            if (userService.checkPassword(existingUser, user.getPassword())) {
                                String token = jwtUtil.generateToken(existingUser.getUsername());
                                UserDto userDto = new UserDto(existingUser);
                                
                                Map<String, Object> response = new HashMap<>();
                                response.put("token", token);
                                response.put("user", userDto);
                                
                                return ResponseEntity.ok(response);
                            } else {
                                return ResponseEntity.status(401).body("Invalid password");
                            }
                        } catch (Exception e) {
                            return ResponseEntity.internalServerError().body("Login error: " + e.getMessage());
                        }
                    })
                    .orElse(ResponseEntity.status(404).body("User not found"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Login error: " + e.getMessage());
        }
    }

}
