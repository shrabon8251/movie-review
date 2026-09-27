import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { movieApi } from '../api/movieApi';
import { reviewApi } from '../api/reviewApi';
import { authApi } from '../api/authApi';
import { FaFilm, FaUsers, FaStar, FaComment } from 'react-icons/fa';
import Spinner from '../components/common/Spinner';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [movies, reviews, users] = await Promise.all([
          movieApi.getAll(),
          reviewApi.getAll(),
          authApi.getAllUsers(),
        ]);
        const totalReviews = reviews.data.length;
        const avgRating = totalReviews > 0
          ? reviews.data.reduce((sum, r) => sum + (r.rating || 0), 0) / totalReviews
          : 0;

        setStats({
          totalMovies: movies.data.length,
          totalUsers: users.data.length,
          totalReviews,
          averageRating: avgRating,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <Spinner />;

  const cards = [
    { title: 'Movies', value: stats.totalMovies, icon: FaFilm, color: 'primary' },
    { title: 'Users', value: stats.totalUsers, icon: FaUsers, color: 'success' },
    { title: 'Reviews', value: stats.totalReviews, icon: FaComment, color: 'warning' },
    { title: 'Avg Rating', value: stats.averageRating.toFixed(1), icon: FaStar, color: 'danger' },
  ];

  return (
    <Container className="py-4">
      <h2 className="mb-4">👨‍💼 Admin Dashboard</h2>
      <Row className="mb-4">
        {cards.map((card) => (
          <Col md={3} key={card.title} className="mb-3">
            <Card className="text-center shadow-sm">
              <Card.Body>
                <card.icon size={30} className={`text-${card.color}`} />
                <h3>{card.value}</h3>
                <p className="text-muted mb-0">{card.title}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col md={4} className="mb-3">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Link to="/admin/movies" className="btn btn-primary w-100">
                Manage Movies
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Link to="/admin/users" className="btn btn-success w-100">
                Manage Users
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Link to="/admin/reviews" className="btn btn-warning w-100">
                Manage Reviews
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
