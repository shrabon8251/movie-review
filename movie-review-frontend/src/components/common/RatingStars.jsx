import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating, size = 20, interactive = false, onRatingChange }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} color="#ffc107" size={size} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} color="#ffc107" size={size} />);
      } else {
        stars.push(<FaRegStar key={i} color="#ffc107" size={size} />);
      }
    }
    return stars;
  };

  if (interactive && onRatingChange) {
    return (
      <div className="d-flex gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <FaStar
            key={value}
            color={value <= rating ? '#ffc107' : '#e4e5e9'}
            size={size}
            style={{ cursor: 'pointer' }}
            onClick={() => onRatingChange(value)}
          />
        ))}
      </div>
    );
  }

  return <div className="d-flex gap-1">{renderStars()}</div>;
};

export default RatingStars;
