import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProfilePage from './pages/ProfilePage';
import MyReviewsPage from './pages/MyReviewsPage';
import MyFavoritesPage from './pages/MyFavoritesPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminMovies from './components/admin/AdminMovies';
import AdminUsers from './components/admin/AdminUsers';
import AdminReviews from './components/admin/AdminReviews';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'ADMIN') return <Navigate to="/" />;
  return children;
};

function AppContent() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={
            <PrivateRoute><ProfilePage /></PrivateRoute>
          } />
          <Route path="/my-reviews" element={
            <PrivateRoute><MyReviewsPage /></PrivateRoute>
          } />
          <Route path="/favorites" element={
            <PrivateRoute><MyFavoritesPage /></PrivateRoute>
          } />
          <Route path="/admin" element={
            <PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>
          } />
          <Route path="/admin/movies" element={
            <PrivateRoute adminOnly><AdminMovies /></PrivateRoute>
          } />
          <Route path="/admin/users" element={
            <PrivateRoute adminOnly><AdminUsers /></PrivateRoute>
          } />
          <Route path="/admin/reviews" element={
            <PrivateRoute adminOnly><AdminReviews /></PrivateRoute>
          } />
        </Routes>
      </div>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
