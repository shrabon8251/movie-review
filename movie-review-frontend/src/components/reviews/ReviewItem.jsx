import React from 'react';
import { Card } from 'react-bootstrap';
import RatingStars from '../common/RatingStars';
import { formatDate } from '../../utils/helpers';

const ReviewItem = ({ review }) => (
  <Card className="mb-3 shadow-sm">
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>{review.userName}</strong>
        <small className="text-muted">
          {formatDate(review.createdAt)}
        </small>
      </div>
      <RatingStars rating={review.rating || 0} size={18} />
      <p className="mt-2 mb-0">{review.comment}</p>
    </Card.Body>
  </Card>
);

export default ReviewItem;
