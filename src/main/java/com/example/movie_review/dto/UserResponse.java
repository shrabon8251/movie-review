package com.example.movie_review.dto;

import com.example.movie_review.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponse {
    private String id;
    private String name;
    private String email;
    private String role;
    private boolean blocked;

    public static UserResponse fromUser(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.isBlocked()
        );
    }
}
