import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Badge } from 'react-bootstrap';
import { movieApi } from '../api/movieApi';
import MovieCard from '../components/common/MovieCard';
import Spinner from '../components/common/Spinner';

const GENRES = ['All', 'Action', 'Sci-Fi', 'Drama', 'Comedy', 'Crime', 'Thriller', 'Horror', 'Romance'];

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let res;
        if (search) {
          res = await movieApi.search(search);
        } else if (selectedGenre !== 'All') {
          res = await movieApi.filterByGenre(selectedGenre);
        } else {
          res = await movieApi.getAll();
        }
        setMovies(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    // debounce search a little
    const timer = setTimeout(fetchMovies, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [search, selectedGenre]);

  return (
    <Container className="py-4">
      <h2 className="mb-4">Browse Movies</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={8}>
          <div className="d-flex flex-wrap gap-2">
            {GENRES.map((genre) => (
              <Badge
                key={genre}
                pill
                bg={selectedGenre === genre ? 'primary' : 'secondary'}
                style={{ cursor: 'pointer', padding: '8px 14px' }}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </Badge>
            ))}
          </div>
        </Col>
      </Row>

      {loading ? (
        <Spinner />
      ) : movies.length === 0 ? (
        <p className="text-center text-muted py-5">No movies found.</p>
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id} md={4} lg={3} className="mb-4">
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MoviesPage;
