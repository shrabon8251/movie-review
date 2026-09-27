package com.example.movie_review.controller;

import com.example.movie_review.dto.AuthResponse;
import com.example.movie_review.dto.LoginRequest;
import com.example.movie_review.dto.RegisterRequest;
import com.example.movie_review.dto.UserResponse;
import com.example.movie_review.entity.User;
import com.example.movie_review.repository.UserRepository;
import com.example.movie_review.security.CustomUserDetailsService;
import com.example.movie_review.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    // ---- Sign up ----
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "An account with this email already exists"));
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");
        user.setBlocked(false);

        User saved = userRepository.save(user);

        String token = jwtUtil.generateToken(saved.getEmail(), saved.getId(), saved.getRole());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new AuthResponse(token, UserResponse.fromUser(saved)));
    }

    // ---- Sign in ----
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (DisabledException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "This account has been blocked. Contact an administrator."));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail(), user.getId(), user.getRole());
        return ResponseEntity.ok(new AuthResponse(token, UserResponse.fromUser(user)));
    }

    // ---- Current user profile (used to restore session on page refresh) ----
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(UserResponse.fromUser(user));
    }

    // ---- Update profile (name / password) ----
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(Authentication authentication, @RequestBody Map<String, String> updates) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Not authenticated"));
        }
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(principal.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updates.containsKey("name") && !updates.get("name").isBlank()) {
            user.setName(updates.get("name"));
        }
        if (updates.containsKey("password") && !updates.get("password").isBlank()) {
            user.setPassword(passwordEncoder.encode(updates.get("password")));
        }

        User saved = userRepository.save(user);
        return ResponseEntity.ok(UserResponse.fromUser(saved));
    }

    // ---- Sign out ----
    // JWTs are stateless, so "logging out" just means the frontend deletes its
    // stored token (see AuthContext.jsx -> logout()). This endpoint is provided
    // for completeness / symmetry and to clear the server-side security context
    // for the current request.
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        SecurityContextHolder.clearContext();
        Map<String, String> body = new HashMap<>();
        body.put("message", "Logged out successfully");
        return ResponseEntity.ok(body);
    }
}
