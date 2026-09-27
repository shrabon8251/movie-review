package com.example.movie_review.entity;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Document(collection = "reviews")
public class Review {

    @Id
    private String id;

    @NotBlank(message = "Movie is required")
    private String movieId;

    private String movieTitle;

    @NotBlank(message = "User is required")
    private String userId;

    private String userName;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating cannot be more than 5")
    private Integer rating; // 1 to 5 stars

    @Size(max = 1000, message = "Comment cannot exceed 1000 characters")
    private String comment;

    private LocalDateTime createdAt;


}