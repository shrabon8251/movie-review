package com.example.movie_review.service;

import com.example.movie_review.entity.Favorite;
import com.example.movie_review.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;

    @Autowired
    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    public List<Favorite> getAllFavorites() {
        return favoriteRepository.findAll();
    }

    public Optional<Favorite> getFavoriteById(String id) {
        return favoriteRepository.findById(id);
    }

    public Favorite addFavorite(Favorite favorite) {
        return favoriteRepository.save(favorite);
    }

    public void removeFavorite(String id) {
        favoriteRepository.deleteById(id);
    }

    public void removeFavoriteByUserAndMovie(String userId, String movieId) {
        favoriteRepository.deleteByUserIdAndMovieId(userId, movieId);
    }

    public List<Favorite> getFavoritesByUser(String userId) {
        return favoriteRepository.findByUserId(userId);
    }

    public Optional<Favorite> getFavoriteByUserAndMovie(String userId, String movieId) {
        return favoriteRepository.findByUserIdAndMovieId(userId, movieId);
    }

    public boolean isMovieFavoritedByUser(String userId, String movieId) {
        return favoriteRepository.existsByUserIdAndMovieId(userId, movieId);
    }

    public long countFavoritesForMovie(String movieId) {
        return favoriteRepository.countByMovieId(movieId);
    }
}