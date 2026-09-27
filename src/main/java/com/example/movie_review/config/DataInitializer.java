package com.example.movie_review.config;

import com.example.movie_review.entity.Movie;
import com.example.movie_review.entity.User;
import com.example.movie_review.repository.MovieRepository;
import com.example.movie_review.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize sample users if empty
        if (userRepository.count() == 0) {
            User user1 = new User();
            user1.setName("John Doe");
            user1.setEmail("john@example.com");
            user1.setPassword(passwordEncoder.encode("password123"));
            user1.setRole("USER");

            User user2 = new User();
            user2.setName("Jane Smith");
            user2.setEmail("jane@example.com");
            user2.setPassword(passwordEncoder.encode("password123"));
            user2.setRole("USER");

            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");

            userRepository.saveAll(Arrays.asList(user1, user2, admin));
            System.out.println("Sample users created (passwords are bcrypt-encoded).");
        }

        // Initialize sample movies if empty
        if (movieRepository.count() == 0) {
            Movie movie1 = new Movie();
            movie1.setTitle("The Matrix");
            movie1.setDescription("A computer hacker learns about the true nature of reality and his role in the war against its controllers.");
            movie1.setReleaseYear(1999);
            movie1.setGenre(Arrays.asList("Action", "Sci-Fi"));
            movie1.setDirector("Lana Wachowski, Lilly Wachowski");
            movie1.setActors(Arrays.asList("Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"));
            movie1.setDuration(136);
            movie1.setPosterUrl("https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg");
            movie1.setYoutubeVideoId("vKQi3bBA1y8");

            Movie movie2 = new Movie();
            movie2.setTitle("Inception");
            movie2.setDescription("A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.");
            movie2.setReleaseYear(2010);
            movie2.setGenre(Arrays.asList("Action", "Sci-Fi", "Thriller"));
            movie2.setDirector("Christopher Nolan");
            movie2.setActors(Arrays.asList("Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"));
            movie2.setDuration(148);
            movie2.setPosterUrl("https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg");
            movie2.setYoutubeVideoId("YoHD9XEInc0");

            Movie movie3 = new Movie();
            movie3.setTitle("The Dark Knight");
            movie3.setDescription("When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.");
            movie3.setReleaseYear(2008);
            movie3.setGenre(Arrays.asList("Action", "Crime", "Drama"));
            movie3.setDirector("Christopher Nolan");
            movie3.setActors(Arrays.asList("Christian Bale", "Heath Ledger", "Aaron Eckhart"));
            movie3.setDuration(152);
            movie3.setPosterUrl("https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg");
            movie3.setYoutubeVideoId("EXeTwQWrcwY");

            movieRepository.saveAll(Arrays.asList(movie1, movie2, movie3));
            System.out.println("Sample movies created.");
        }
    }
}