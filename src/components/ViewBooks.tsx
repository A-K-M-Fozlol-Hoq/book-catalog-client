// ViewBooks.tsx
import React from 'react';
import BookCard from './BookCard';

interface Book {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  _id: string;
}

interface ViewBooksProps {
  books: Book[];
}

const ViewBooks: React.FC<ViewBooksProps> = ({ books }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default ViewBooks;
