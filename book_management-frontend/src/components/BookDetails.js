// src/components/BookDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

function BookDetails() {
  // hold the details of a single book
  const [book, setBook] = useState(null);
  
  // Get the book ID 
  const { id } = useParams();
  
  // Hook to navigate back to the book list
  const navigate = useNavigate();

  // Fetching of book data
  useEffect(() => {
    fetchBook();
  }, []);

  // fetching of book data by id
  const fetchBook = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`);
    const data = await response.json();
    setBook(data); // Set the fetched book data in the state
  };

  return (
    <div>
      {/* Conditional rendering to check if book data is loaded */}
      {book ? (
        <Card>
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text><strong>Author:</strong> {book.author}</Card.Text>
            <Card.Text><strong>Published Year:</strong> {book.published_year}</Card.Text>
            <Card.Text><strong>Genre:</strong> {book.genre}</Card.Text>
            <Card.Text><strong>Description:</strong> {book.description}</Card.Text>
            
            {/* Button to navigate back to the main book list */}
            <Button variant="secondary" onClick={() => navigate('/')}>Back to List</Button>
          </Card.Body>
        </Card>
      ) : (
        // Display loading message while the data is being fetched
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BookDetails;
