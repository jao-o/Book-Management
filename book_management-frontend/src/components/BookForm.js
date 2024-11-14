// src/components/BookForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

function BookForm() {
  // initialize form data
  const [book, setBook] = useState({ title: '', author: '', published_year: '', genre: '', description: '' });
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate(); // Navigate between pages

  // fetch book
  useEffect(() => {
    if (id) {
      fetchBook(id);
    }
  }, [id]);

  // book details
  const fetchBook = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`);
    const data = await response.json();
    setBook(data);
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = id ? `http://127.0.0.1:8000/api/books/${id}` : 'http://127.0.0.1:8000/api/books';
    const method = id ? 'PUT' : 'POST';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
    navigate('/'); // Redirect to book list
  };

  // input changes
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <h2>{id ? 'Edit Book' : 'Add Book'}</h2>
      <Form onSubmit={handleSubmit}>
        {/* Title field */}
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={book.title} onChange={handleChange} required />
        </Form.Group>

        {/* Author field */}
        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author" value={book.author} onChange={handleChange} required />
        </Form.Group>

        {/* Published Year field */}
        <Form.Group controlId="published_year">
          <Form.Label>Published Year</Form.Label>
          <Form.Control type="number" name="published_year" value={book.published_year} onChange={handleChange} required />
        </Form.Group>

        {/* Genre field */}
        <Form.Group controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" name="genre" value={book.genre} onChange={handleChange} required />
        </Form.Group>

        {/* Description field */}
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={book.description} onChange={handleChange} required />
        </Form.Group>

        {/* Save and Back buttons */}
        <Button variant="primary" type="submit" className="mt-3">Save</Button>
        <Button variant="secondary" onClick={() => navigate('/')} className="mt-3 ms-2">Back</Button>
      </Form>
    </Container>
  );
}

export default BookForm;
