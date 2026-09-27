package com.example.movie_review.controller;

import com.example.movie_review.dto.UserResponse;
import com.example.movie_review.entity.User;
import com.example.movie_review.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserResponse::fromUser)
                .toList();
    }

    @PutMapping("/users/{id}/block")
    public ResponseEntity<?> blockUser(@PathVariable String id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setBlocked(true);
                    return ResponseEntity.ok(UserResponse.fromUser(userRepository.save(user)));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/users/{id}/unblock")
    public ResponseEntity<?> unblockUser(@PathVariable String id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setBlocked(false);
                    return ResponseEntity.ok(UserResponse.fromUser(userRepository.save(user)));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
