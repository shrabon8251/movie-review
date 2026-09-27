import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { reviewApi } from '../api/reviewApi';
import RatingStars from '../components/common/RatingStars';
import Spinner from '../components/common/Spinner';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyReviewsPage = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      reviewApi.getByUser(user.id)
        .then((res) => setReviews(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleDelete = async (reviewId) => {
    try {
      await reviewApi.delete(reviewId);
      setReviews(reviews.filter((r) => r.id !== reviewId));
      toast.success('Review deleted');
    } catch (err) {
      toast.error('Failed to delete review');
    }
  };

  if (loading) return <Spinner />;

  return (
    <Container className="py-4">
      <h2 className="mb-4">My Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-muted">
          You haven&apos;t reviewed any movies yet.{' '}
          <Link to="/movies">Browse movies</Link>
        </p>
      ) : (
        <ListGroup>
          {reviews.map((review) => (
            <ListGroup.Item key={review.id} className="d-flex justify-content-between align-items-start">
              <div>
                <Link to={`/movies/${review.movieId}`}>
                  <strong>{review.movieTitle}</strong>
                </Link>
                <div className="my-1">
                  <RatingStars rating={review.rating || 0} size={18} />
                </div>
                <p className="mb-1">{review.comment}</p>
                <small className="text-muted">
                  {new Date(review.createdAt).toLocaleDateString()}
                </small>
              </div>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(review.id)}
              >
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default MyReviewsPage;
