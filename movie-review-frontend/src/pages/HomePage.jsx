import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { movieApi } from '../api/movieApi';
import MovieCard from '../components/common/MovieCard';
import Spinner from '../components/common/Spinner';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    movieApi.getAll()
      .then((res) => setMovies(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <Container className="py-4">
      <div className="hero-section text-center text-white">
        <h1>🎬 Welcome to Movie Review</h1>
        <p className="lead">Discover movies, watch trailers, and share your thoughts</p>
      </div>

      <h4 className="mb-3">Featured Movies</h4>
      <Row>
        {movies.slice(0, 8).map((movie) => (
          <Col key={movie.id} md={4} lg={3} className="mb-4">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
