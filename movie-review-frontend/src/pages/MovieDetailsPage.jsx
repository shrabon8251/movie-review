import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { movieApi } from '../api/movieApi';
import { reviewApi } from '../api/reviewApi';
import { favoriteApi } from '../api/favoriteApi';
import RatingStars from '../components/common/RatingStars';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';
import FavoriteButton from '../components/favorites/FavoriteButton';
import Spinner from '../components/common/Spinner';
import toast from 'react-hot-toast';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, reviewsRes] = await Promise.all([
          movieApi.getById(id),
          reviewApi.getByMovie(id),
        ]);
        setMovie(movieRes.data);
        setReviews(reviewsRes.data);

        if (user) {
          try {
            const [favRes, userReviewRes] = await Promise.all([
              favoriteApi.exists(user.id, id),
              reviewApi.getByMovieAndUser(id, user.id),
            ]);
            setIsFavorite(favRes.data);
            setUserReview(userReviewRes.data || null);
          } catch (err) {
            // user may not have a review yet — fine
            setIsFavorite(false);
            setUserReview(null);
          }
        }
      } catch (err) {
        toast.error('Failed to load movie details');
        navigate('/movies');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user, navigate]);

  const handleReviewAdded = async () => {
    const res = await reviewApi.getByMovie(id);
    setReviews(res.data);
    if (user) {
      try {
        const userReviewRes = await reviewApi.getByMovieAndUser(id, user.id);
        setUserReview(userReviewRes.data || null);
      } catch (err) {
        setUserReview(null);
      }
    }
  };

  if (loading) return <Spinner />;
  if (!movie) return <div className="text-center py-5">Movie not found</div>;

  return (
    <Container className="py-4">
      <Row>
        <Col md={4}>
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="img-fluid rounded shadow w-100"
            style={{ objectFit: 'cover' }}
          />
          {user && (
            <FavoriteButton
              movieId={movie.id}
              userId={user.id}
              isFavorite={isFavorite}
              onToggle={setIsFavorite}
            />
          )}
        </Col>
        <Col md={8}>
          <h1>{movie.title}</h1>
          <p className="text-muted">
            {movie.releaseYear} · {movie.genre?.join(', ')} · {movie.duration} min
          </p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Cast:</strong> {movie.actors?.join(', ')}</p>
          <div className="d-flex align-items-center gap-3 mb-3">
            <RatingStars rating={movie.averageRating || 0} size={24} />
            <span className="fs-4 fw-bold">{(movie.averageRating || 0).toFixed(1)}</span>
            <span className="text-muted">({movie.totalReviews || 0} reviews)</span>
          </div>
          <p>{movie.description}</p>

          {movie.youtubeVideoId && (
            <div className="mt-4">
              <h5>🎥 Trailer</h5>
              <div className="ratio ratio-16x9">
                <iframe
                  src={`https://www.youtube.com/embed/${movie.youtubeVideoId}`}
                  title={movie.title}
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h4 className="mb-3">💬 Reviews</h4>
          {!user ? (
            <p className="text-muted">Login to write a review.</p>
          ) : userReview ? (
            <Card className="mb-3 bg-light">
              <Card.Body>
                <p className="text-success mb-1">
                  ✅ You have already reviewed this movie (rating: {userReview.rating}/5)
                </p>
                <p className="mb-0">{userReview.comment}</p>
              </Card.Body>
            </Card>
          ) : (
            <ReviewForm
              movieId={movie.id}
              movieTitle={movie.title}
              userId={user.id}
              userName={user.name}
              onReviewAdded={handleReviewAdded}
            />
          )}
          <ReviewList reviews={reviews} />
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailsPage;
