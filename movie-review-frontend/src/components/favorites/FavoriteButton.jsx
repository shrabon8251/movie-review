import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { favoriteApi } from '../../api/favoriteApi';
import toast from 'react-hot-toast';

const FavoriteButton = ({ movieId, userId, isFavorite, onToggle }) => {
  const [favorited, setFavorited] = useState(isFavorite);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      if (favorited) {
        await favoriteApi.removeByUserAndMovie(userId, movieId);
        setFavorited(false);
        toast.success('Removed from favorites');
      } else {
        await favoriteApi.add({ userId, movieId });
        setFavorited(true);
        toast.success('Added to favorites!');
      }
      onToggle && onToggle(favorited);
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={favorited ? 'danger' : 'outline-danger'}
      className="w-100 mt-3"
      onClick={handleToggle}
      disabled={loading}
    >
      {favorited ? (
        <>
          <FaHeart className="me-2" /> Remove Favorite
        </>
      ) : (
        <>
          <FaRegHeart className="me-2" /> Add to Favorites
        </>
      )}
    </Button>
  );
};

export default FavoriteButton;
