import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import RatingStars from '../common/RatingStars';
import { reviewApi } from '../../api/reviewApi';
import toast from 'react-hot-toast';

const ReviewForm = ({ movieId, movieTitle, userId, userName, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    setSubmitting(true);
    try {
      await reviewApi.add({
        movieId,
        movieTitle,
        userId,
        userName,
        rating,
        comment,
      });
      toast.success('Review submitted!');
      setRating(0);
      setComment('');
      onReviewAdded();
    } catch (err) {
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <h5>Write a Review</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Rating</Form.Label>
            <RatingStars
              rating={rating}
              size={30}
              interactive
              onRatingChange={setRating}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Your Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this movie..."
              maxLength={1000}
            />
          </Form.Group>
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ReviewForm;
