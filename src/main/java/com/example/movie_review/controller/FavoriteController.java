package com.example.movie_review.controller;

import com.example.movie_review.entity.Favorite;
import com.example.movie_review.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @GetMapping
    public List<Favorite> getAllFavorites() {
        return favoriteService.getAllFavorites();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Favorite> getFavoriteById(@PathVariable String id) {
        return favoriteService.getFavoriteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Favorite> addFavorite(@RequestBody Favorite favorite) {
        Favorite added = favoriteService.addFavorite(favorite);
        return ResponseEntity.status(HttpStatus.CREATED).body(added);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFavorite(@PathVariable String id) {
        favoriteService.removeFavorite(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/user/{userId}/movie/{movieId}")
    public ResponseEntity<Void> removeFavoriteByUserAndMovie(@PathVariable String userId, @PathVariable String movieId) {
        favoriteService.removeFavoriteByUserAndMovie(userId, movieId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public List<Favorite> getFavoritesByUser(@PathVariable String userId) {
        return favoriteService.getFavoritesByUser(userId);
    }

    @GetMapping("/user/{userId}/movie/{movieId}/exists")
    public ResponseEntity<Boolean> isMovieFavoritedByUser(@PathVariable String userId, @PathVariable String movieId) {
        boolean exists = favoriteService.isMovieFavoritedByUser(userId, movieId);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/movie/{movieId}/count")
    public ResponseEntity<Long> countFavoritesForMovie(@PathVariable String movieId) {
        long count = favoriteService.countFavoritesForMovie(movieId);
        return ResponseEntity.ok(count);
    }
}