import React from 'react';
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-muted">No reviews yet. Be the first to review!</p>;
  }
  return (
    <div>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
