package com.example.movie_review.config;

import com.example.movie_review.entity.Movie;
import com.example.movie_review.entity.User;
import com.example.movie_review.repository.MovieRepository;
import com.example.movie_review.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize sample users if empty
        if (userRepository.count() == 0) {
            User user1 = new User("John Doe", "john@example.com", "password123", "USER");
            User user2 = new User("Jane Smith", "jane@example.com", "password123", "USER");
            userRepository.saveAll(Arrays.asList(user1, user2));
            System.out.println("Sample users created.");
        }

        // Initialize sample movies if empty
        if (movieRepository.count() == 0) {
            Movie movie1 = new Movie(
                    "The Matrix",
                    "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
                    1999,
                    Arrays.asList("Action", "Sci-Fi"),
                    "Lana Wachowski, Lilly Wachowski",
                    Arrays.asList("Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"),
                    136,
                    "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
                    "vKQi3bBA1y8"
            );
            Movie movie2 = new Movie(
                    "Inception",
                    "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
                    2010,
                    Arrays.asList("Action", "Sci-Fi", "Thriller"),
                    "Christopher Nolan",
                    Arrays.asList("Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"),
                    148,
                    "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
                    "YoHD9XEInc0"
            );
            Movie movie3 = new Movie(
                    "The Dark Knight",
                    "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                    2008,
                    Arrays.asList("Action", "Crime", "Drama"),
                    "Christopher Nolan",
                    Arrays.asList("Christian Bale", "Heath Ledger", "Aaron Eckhart"),
                    152,
                    "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                    "EXeTwQWrcwY"
            );
            movieRepository.saveAll(Arrays.asList(movie1, movie2, movie3));
            System.out.println("Sample movies created.");
        }
    }
}