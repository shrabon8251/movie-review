import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import { movieApi } from '../../api/movieApi';
import Spinner from '../common/Spinner';
import toast from 'react-hot-toast';

const EMPTY_FORM = {
  title: '',
  description: '',
  releaseYear: '',
  genre: '',
  director: '',
  actors: '',
  duration: '',
  posterUrl: '',
  youtubeVideoId: '',
};

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    movieApi.getAll()
      .then((res) => setMovies(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEditForm = (movie) => {
    setEditingId(movie.id);
    setForm({
      title: movie.title,
      description: movie.description || '',
      releaseYear: movie.releaseYear || '',
      genre: (movie.genre || []).join(', '),
      director: movie.director || '',
      actors: (movie.actors || []).join(', '),
      duration: movie.duration || '',
      posterUrl: movie.posterUrl || '',
      youtubeVideoId: movie.youtubeVideoId || '',
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      releaseYear: parseInt(form.releaseYear),
      duration: parseInt(form.duration),
      genre: form.genre.split(',').map((g) => g.trim()).filter(Boolean),
      actors: form.actors.split(',').map((a) => a.trim()).filter(Boolean),
    };
    try {
      if (editingId) {
        await movieApi.update(editingId, payload);
        toast.success('Movie updated!');
      } else {
        await movieApi.create(payload);
        toast.success('Movie added!');
      }
      setShowForm(false);
      const res = await movieApi.getAll();
      setMovies(res.data);
    } catch (err) {
      toast.error('Failed to save movie');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this movie?')) return;
    try {
      await movieApi.delete(id);
      setMovies(movies.filter((m) => m.id !== id));
      toast.success('Movie deleted');
    } catch (err) {
      toast.error('Failed to delete movie');
    }
  };

  if (loading) return <Spinner />;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Movies</h2>
        <Button onClick={openAddForm}>
          + Add Movie
        </Button>
      </div>

      <Table hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Year</th>
            <th>Genres</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  style={{ width: '50px', height: '70px', objectFit: 'cover' }}
                  className="rounded"
                />
              </td>
              <td>{movie.title}</td>
              <td>{movie.releaseYear}</td>
              <td>{movie.genre?.join(', ')}</td>
              <td>{(movie.averageRating || 0).toFixed(1)}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => openEditForm(movie)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(movie.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Edit Movie' : 'Add Movie'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Release Year *</Form.Label>
                  <Form.Control
                    type="number"
                    name="releaseYear"
                    value={form.releaseYear}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Duration (minutes) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Genres (comma separated) *</Form.Label>
              <Form.Control
                type="text"
                name="genre"
                value={form.genre}
                onChange={handleChange}
                placeholder="Action, Sci-Fi"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Director *</Form.Label>
              <Form.Control
                type="text"
                name="director"
                value={form.director}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Actors (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="actors"
                value={form.actors}
                onChange={handleChange}
                placeholder="Actor 1, Actor 2"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Poster URL *</Form.Label>
              <Form.Control
                type="text"
                name="posterUrl"
                value={form.posterUrl}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>YouTube Video ID *</Form.Label>
              <Form.Control
                type="text"
                name="youtubeVideoId"
                value={form.youtubeVideoId}
                onChange={handleChange}
                placeholder="e.g. zSWdZVtXT7E"
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              {editingId ? 'Update Movie' : 'Save Movie'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminMovies;
