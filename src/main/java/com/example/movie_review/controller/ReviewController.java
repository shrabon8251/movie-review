package com.example.movie_review.controller;

import com.example.movie_review.entity.Review;
import com.example.movie_review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable String id) {
        return reviewService.getReviewById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        Review created = reviewService.createReview(review);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable String id, @RequestBody Review review) {
        try {
            Review updated = reviewService.updateReview(id, review);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable String id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/movie/{movieId}")
    public List<Review> getReviewsByMovie(@PathVariable String movieId) {
        return reviewService.getReviewsByMovieOrderedByDate(movieId);
    }

    @GetMapping("/user/{userId}")
    public List<Review> getReviewsByUser(@PathVariable String userId) {
        return reviewService.getReviewsByUser(userId);
    }

    @GetMapping("/movie/{movieId}/user/{userId}")
    public ResponseEntity<Review> getReviewByMovieAndUser(@PathVariable String movieId, @PathVariable String userId) {
        return reviewService.getReviewByMovieAndUser(movieId, userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/movie/{movieId}/user/{userId}")
    public ResponseEntity<Void> deleteReviewByMovieAndUser(@PathVariable String movieId, @PathVariable String userId) {
        reviewService.deleteReviewByMovieAndUser(movieId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/movie/{movieId}/average")
    public ResponseEntity<Double> getAverageRatingForMovie(@PathVariable String movieId) {
        double avg = reviewService.getAverageRatingForMovie(movieId);
        return ResponseEntity.ok(avg);
    }
}