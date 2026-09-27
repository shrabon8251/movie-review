import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { reviewApi } from '../../api/reviewApi';
import RatingStars from '../common/RatingStars';
import Spinner from '../common/Spinner';
import toast from 'react-hot-toast';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reviewApi.getAll()
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await reviewApi.delete(id);
      setReviews(reviews.filter((r) => r.id !== id));
      toast.success('Review deleted');
    } catch (err) {
      toast.error('Failed to delete review');
    }
  };

  if (loading) return <Spinner />;

  return (
    <Container className="py-4">
      <h2 className="mb-4">Manage Reviews</h2>
      <Table hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th>Movie</th>
            <th>User</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.movieTitle}</td>
              <td>{review.userName}</td>
              <td><RatingStars rating={review.rating || 0} size={16} /></td>
              <td>{review.comment || '—'}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(review.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminReviews;
