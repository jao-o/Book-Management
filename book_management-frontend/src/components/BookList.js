// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Alert } from 'react-bootstrap';

function BookList() {
  // State to hold the list of books
  const [books, setBooks] = useState([]);
  
  // State to handle error messages
  const [error, setError] = useState(null);

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Function to fetch books from the API
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/books');
      
      // Error handler if database is not reachable
      if (!response.ok) {
        throw new Error('Unable to load data. Please check the database connection.');
      }
      
      // Parse and set the fetched book data
      const data = await response.json();
      setBooks(data);
      setError(null); // Reset error if data loads successfully
    } catch (err) {
      setError(err.message); // Set error if data loading fails
    }
  };

  // Deletion of books
  const deleteBook = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`, { method: 'DELETE' });
      
      // Error handler if deletion was successful
      if (!response.ok) {
        throw new Error('Unable to delete the book. Please try again.');
      }
      
      // Update book list after deletion
      setBooks(books.filter(book => book.id !== id));
    } catch (err) {
      setError(err.message); // Set error if deletion fails
    }
  };

  return (
    <div>
      <h2>Book List</h2>
      
      {/* Display error alert if there's an error */}
      {error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          {/* Button to add a new book */}
          <Link to="/add">
            <Button variant="success" className="mb-3">Add New Book</Button>
          </Link>

          {/* Table to display the list of books */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Display list of books if available, otherwise show message */}
              {books.length > 0 ? (
                books.map(book => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>
                      {/* View, Edit, and Delete buttons for each book */}
                      <Link to={`/view/${book.id}`}>
                        <Button variant="info" className="me-2">View</Button>
                      </Link>
                      <Link to={`/edit/${book.id}`}>
                        <Button variant="warning" className="me-2">Edit</Button>
                      </Link>
                      <Button variant="danger" onClick={() => deleteBook(book.id)}>Delete</Button>
                    </td>
                  </tr>
                ))
              ) : (
                // Message if no books are available
                <tr>
                  <td colSpan="3" className="text-center">No books available.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

export default BookList;
