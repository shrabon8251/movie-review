import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { favoriteApi } from '../api/favoriteApi';
import MovieCard from '../components/common/MovieCard';
import Spinner from '../components/common/Spinner';
import { Link } from 'react-router-dom';

const MyFavoritesPage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      favoriteApi.getByUser(user.id)
        .then((res) => setFavorites(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) return <Spinner />;

  // favorites carry movieId/movieTitle/posterUrl — build pseudo-movie objects
  const favoriteMovies = favorites.map((fav) => ({
    id: fav.movieId,
    title: fav.movieTitle,
    posterUrl: fav.posterUrl,
    genre: [],
  }));

  return (
    <Container className="py-4">
      <h2 className="mb-4">My Favorites</h2>
      {favoriteMovies.length === 0 ? (
        <p className="text-muted">
          No favorites yet.{' '}
          <Link to="/movies">Browse movies to add some!</Link>
        </p>
      ) : (
        <Row>
          {favoriteMovies.map((movie) => (
            <Col key={movie.id} md={4} lg={3} className="mb-4">
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyFavoritesPage;
