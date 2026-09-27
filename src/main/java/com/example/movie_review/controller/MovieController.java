package com.example.movie_review.controller;

import com.example.movie_review.entity.Movie;
import com.example.movie_review.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable String id) {
        return movieService.getMovieById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        Movie created = movieService.createMovie(movie);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable String id, @RequestBody Movie movie) {
        try {
            Movie updated = movieService.updateMovie(id, movie);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable String id) {
        if (!movieService.movieExists(id)) {
            return ResponseEntity.notFound().build();
        }
        movieService.deleteMovie(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<Movie> searchMovies(@RequestParam String title) {
        return movieService.searchMoviesByTitle(title);
    }

    @GetMapping("/genre/{genre}")
    public List<Movie> getMoviesByGenre(@PathVariable String genre) {
        return movieService.getMoviesByGenre(genre);
    }

    @GetMapping("/year/{year}")
    public List<Movie> getMoviesByYear(@PathVariable Integer year) {
        return movieService.getMoviesByYear(year);
    }
}