package com.example.movie_review.repository;

import com.example.movie_review.entity.Favorite;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends MongoRepository<Favorite, String> {

    List<Favorite> findByUserId(String userId);

    Optional<Favorite> findByUserIdAndMovieId(String userId, String movieId);

    boolean existsByUserIdAndMovieId(String userId, String movieId);

    void deleteByUserIdAndMovieId(String userId, String movieId);

    long countByMovieId(String movieId);
}