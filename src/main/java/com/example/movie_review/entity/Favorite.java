package com.example.movie_review.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Document(collection = "favorites")
public class Favorite {

    @Id
    private String id;

    @NotBlank(message = "User is required")
    private String userId;

    @NotBlank(message = "Movie is required")
    private String movieId;

    private String movieTitle;

    private String posterUrl;


}
