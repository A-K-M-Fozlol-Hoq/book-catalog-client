// BookCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const navigate = useNavigate();
  const handleCardClick = () => {
    console.log("redircting...", book._id)
    navigate(`/book-details/${book._id}`);
  };

  return (
    <div
      className="border border-gray-300 p-4 rounded-lg mb-4 cursor-pointer"
      onClick={handleCardClick}
    >
      <h2 className="text-xl font-bold mb-2">{book.title}</h2>
      <p><span className="font-semibold">Author:</span> {book.author}</p>
      <p><span className="font-semibold">Genre:</span> {book.genre}</p>
      <p><span className="font-semibold">Publication Date:</span> {book.publicationDate}</p>
    </div>
  );
};

export default BookCard;
