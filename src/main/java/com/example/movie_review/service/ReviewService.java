package com.example.movie_review.service;

import com.example.movie_review.entity.Review;
import com.example.movie_review.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Optional<Review> getReviewById(String id) {
        return reviewRepository.findById(id);
    }

    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    public Review updateReview(String id, Review reviewDetails) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
        review.setRating(reviewDetails.getRating());
        review.setComment(reviewDetails.getComment());
        return reviewRepository.save(review);
    }

    public void deleteReview(String id) {
        reviewRepository.deleteById(id);
    }

    public List<Review> getReviewsByMovie(String movieId) {
        return reviewRepository.findByMovieId(movieId);
    }

    public List<Review> getReviewsByUser(String userId) {
        return reviewRepository.findByUserId(userId);
    }

    public Optional<Review> getReviewByMovieAndUser(String movieId, String userId) {
        return reviewRepository.findByMovieIdAndUserId(movieId, userId);
    }

    public void deleteReviewByMovieAndUser(String movieId, String userId) {
        reviewRepository.deleteByMovieIdAndUserId(movieId, userId);
    }

    public long countReviewsForMovie(String movieId) {
        return reviewRepository.countByMovieId(movieId);
    }

    public List<Review> getReviewsByMovieOrderedByDate(String movieId) {
        return reviewRepository.findByMovieIdOrderByCreatedAtDesc(movieId);
    }

    public double getAverageRatingForMovie(String movieId) {
        List<Review> reviews = reviewRepository.findByMovieId(movieId);
        if (reviews.isEmpty()) {
            return 0.0;
        }
        return reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
    }
}