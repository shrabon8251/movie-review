package com.example.movie_review.service;

import com.example.movie_review.entity.Movie;
import com.example.movie_review.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> getMovieById(String id) {
        return movieRepository.findById(id);
    }

    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public Movie updateMovie(String id, Movie movieDetails) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with id: " + id));
        movie.setTitle(movieDetails.getTitle());
        movie.setGenre(movieDetails.getGenre());
        movie.setYear(movieDetails.getYear());
        movie.setPosterUrl(movieDetails.getPosterUrl());
        movie.setDescription(movieDetails.getDescription());
        movie.setDirector(movieDetails.getDirector());
        movie.setCast(movieDetails.getCast());
        movie.setDuration(movieDetails.getDuration());
        movie.setRating(movieDetails.getRating());
        return movieRepository.save(movie);
    }

    public void deleteMovie(String id) {
        movieRepository.deleteById(id);
    }

    public List<Movie> searchMoviesByTitle(String title) {
        return movieRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<Movie> getMoviesByGenre(String genre) {
        return movieRepository.findByGenreContaining(genre);
    }

    public List<Movie> getMoviesByYear(Integer year) {
        return movieRepository.findByYear(year);
    }

    public boolean movieExists(String id) {
        return movieRepository.existsById(id);
    }
}