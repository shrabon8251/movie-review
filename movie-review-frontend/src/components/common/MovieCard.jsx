import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import RatingStars from './RatingStars';

const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100 shadow-sm movie-card">
      <Card.Img
        variant="top"
        src={movie.posterUrl}
        alt={movie.title}
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title className="text-truncate">{movie.title}</Card.Title>
        <Card.Text className="text-muted">
          {movie.releaseYear} · {movie.genre?.join(', ')}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <RatingStars rating={movie.averageRating || 0} />
          <span className="fw-bold">
            {(movie.averageRating || 0).toFixed(1)}
          </span>
        </div>
        <Link to={`/movies/${movie.id}`}>
          <Button variant="primary" size="sm" className="mt-2 w-100">
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
