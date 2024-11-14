<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    // List all books
    public function index()
    {
        $books = Book::all(); // Fetch all books
        return response()->json($books); // Return as JSON
    }

    // View book
    public function show($id)
    {
        $book = Book::find($id); // Find book by ID
        if ($book) {
            return response()->json($book); // Return book if found
        } else {
            return response()->json(['message' => 'Book not found'], 404); // Return error if not found
        }
    }

    // Add a new book
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'published_year' => 'required|integer',
            'genre' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]); // Validate request data

        $book = Book::create($validatedData); // Create book record
        return response()->json($book, 201); // Return created book with 201 status
    }

    // Edit a book
    public function update(Request $request, $id)
    {
        $book = Book::find($id); // Find book by ID

        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404); // Return error if not found
        }

        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'author' => 'sometimes|required|string|max:255',
            'published_year' => 'sometimes|required|integer',
            'genre' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
        ]); // Validate updated data

        $book->update($validatedData); // Update book with validated data
        return response()->json($book); // Return updated book
    }

    // Delete a book
    public function destroy($id)
    {
        $book = Book::find($id); // Find book by ID

        if ($book) {
            $book->delete(); // Delete book if found
            return response()->json(['message' => 'Book deleted successfully']); // Success message
        } else {
            return response()->json(['message' => 'Book not found'], 404); // Error if book not found
        }
    }
}
