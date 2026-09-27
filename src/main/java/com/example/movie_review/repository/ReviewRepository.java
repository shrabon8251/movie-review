package com.example.movie_review.repository;

import com.example.movie_review.entity.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {

    List<Review> findByMovieId(String movieId);

    List<Review> findByUserId(String userId);

    Optional<Review> findByMovieIdAndUserId(String movieId, String userId);

    void deleteByMovieIdAndUserId(String movieId, String userId);

    long countByMovieId(String movieId);

    List<Review> findByMovieIdOrderByCreatedAtDesc(String movieId);
}