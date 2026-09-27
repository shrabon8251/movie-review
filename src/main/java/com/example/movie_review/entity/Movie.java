package com.example.movie_review.entity;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Document(collection = "movies")
public class Movie {

    @Id
    private String id;

    @NotBlank(message = "Title is required")
    @Size(min = 1, max = 200, message = "Title must be between 1 and 200 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(max = 2000, message = "Description cannot exceed 2000 characters")
    private String description;

    @NotNull(message = "Release year is required")
    @Min(value = 1888, message = "Release year must be 1888 or later")
    @Max(value = 2100, message = "Release year cannot be in the future")
    private Integer releaseYear;

    @NotEmpty(message = "Select at least one genre")
    private List<String> genre;

    @NotBlank(message = "Director is required")
    private String director;

    private List<String> actors;

    @NotNull(message = "Duration is required")
    @Positive(message = "Duration must be a positive number")
    private Integer duration; // in minutes

    @NotBlank(message = "Poster URL is required")
    private String posterUrl;

    @NotBlank(message = "YouTube video ID is required")
    private String youtubeVideoId;

    private Double averageRating = 0.0;

    private Integer totalReviews = 0;


}
