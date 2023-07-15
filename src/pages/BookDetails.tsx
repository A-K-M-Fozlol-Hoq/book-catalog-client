// BookDetails.tsx
import { useAddReviewMutation, useGetSingleBookQuery } from '@/redux/features/book/bookApi';
import { useAppSelector } from '@/redux/hook';
import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom'; // Assuming you are using React Router for navigation
import { toast } from 'react-toastify';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  ownerEmail: string;
}

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<string[]>([]);
  const [newReview, setNewReview] = useState<string>('');
  const { data, isError, isLoading } = useGetSingleBookQuery({id});
  const [addReview, {  isError: reviewIsError,  isSuccess: reviewIsSuccess }] = useAddReviewMutation();
  const { user } = useAppSelector((state) => state.user);

  useEffect(()=>{
    if(data?.success){
        setBook(data?.data)
        setReviews(data?.data?.reviews)
        if(isError){
            toast("Something went wrong", {
                autoClose: 2500,
                type: "error",
            });
        }
    }
    },[data, isError])

    useEffect(()=>{
        if(reviewIsError){
            toast("Failed to add review", {
                autoClose: 2500,
                type: "error",
            });
        }
        if(reviewIsSuccess){
            setReviews([...reviews, newReview]);
            setNewReview('');
            toast("Review added successfully", {
                autoClose: 2500,
                type: "success",
            });
        }
    },[reviewIsError, reviewIsSuccess])

  const handleEditClick = () => {
    // Redirect to the edit book page with the book id
    navigate(`/edit-book/${book?._id}`)
  };

  const handleDeleteClick = () => {
    // Show a confirmation dialogue before deleting the book
    const wantToDelete = window.confirm('Are you sure you want to delete this book?');
    console.log(wantToDelete)
  };

  const handleSubmitReview = (event: React.FormEvent) => {
    event.preventDefault();
    addReview({ id: book?._id, review:newReview })    
  };

  if(!isLoading && !book){
    return(<h1 className='text-3xl font-bold mb-4 text-center'>Book Not Found</h1>)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {book ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Title: {book.title}</h1>
          <p><span className="font-semibold">Author:</span> {book.author}</p>
          <p><span className="font-semibold">Genre:</span> {book.genre}</p>
          <p><span className="font-semibold">Publication Date:</span> {book.publicationDate}</p>
          <p><span className="font-semibold">Owner Email:</span> {book.ownerEmail}</p>

          <h2 className="text-xl font-bold mt-6 mb-4">Reviews</h2>
          {reviews.map((review, index) => (
            <div key={index} className="border border-gray-300 p-4 rounded-lg mb-4">
              <p> {review} </p>
            </div>
          ))}

          {/* Review Submission Box */}
          <form onSubmit={handleSubmitReview} className="mt-6">
            <label className="block font-semibold">Leave a Review</label>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              rows={4}
              required
            ></textarea>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Submit Review
            </button>
          </form>

          {/* Edit and Delete Buttons */}
          {user?.email === book.ownerEmail && 
          <div className="flex mt-6">
            <button
              onClick={handleEditClick}
              className="bg-green-500 text-white px-4 py-2 rounded-lg mr-4"
            >
              Edit Book
            </button>
            <button
              onClick={handleDeleteClick}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Delete Book
            </button>
          </div>
          
          }
          
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookDetails;
