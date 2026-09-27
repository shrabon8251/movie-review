package com.example.movie_review.repository;

import com.example.movie_review.entity.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends MongoRepository<Movie, String> {

    List<Movie> findByGenreContaining(String genre);

    @Query("{ 'title': { $regex: ?0, $options: 'i' } }")
    List<Movie> searchByTitle(String title);

    List<Movie> findByTitleContainingIgnoreCase(String title);

    List<Movie> findByYear(Integer year);
}