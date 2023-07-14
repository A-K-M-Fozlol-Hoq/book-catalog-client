import { useSignupMutation } from '@/redux/features/user/userApi';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddBookForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [addBook, {  isError,  isSuccess }] = useSignupMutation();
  const navigate = useNavigate();

  useEffect(()=>{
    if(isError){
      toast("Failed to add book", {
        autoClose: 2500,
        type: "error",
      });
    }

    if(isSuccess){
      toast("Book added successfully", {
        autoClose: 2500,
        type: "success",
      });
      navigate('/books')
    }
  }, [isError, isSuccess])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const publicationYear = publicationDate ? new Date(publicationDate).getFullYear() : 2000;
    console.log(title, author, genre, publicationDate, publicationYear)
    const postData = {
      accessToken: sessionStorage.getItem('accessToken'),
      data:{
        title,
        author,
        genre,
        publicationDate,
        publicationYear
      }
    }
    addBook(postData)

  };

  return (
    <>
    <h2 className="text-2xl mb-6">Add Book</h2>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">

    <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title:
        </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
           type="text"
           id="title"
           value={title}
           onChange={(e) => setTitle(e.target.value)}
           required
          />
        </div>

        <div className="mb-4">
        <label htmlFor="author" className="block text-gray-700 font-bold mb-2">
        Author:
        </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
           type="text"
           id="author"
           value={author}
           onChange={(e) => setAuthor(e.target.value)}
           required
          />
        </div>
        <div className="mb-4">
        <label htmlFor="genre" className="block text-gray-700 font-bold mb-2">
        Genre:
        </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
           type="text"
           id="genre"
           value={genre}
           onChange={(e) => setGenre(e.target.value)}
           required
          />
        </div>
      <div className="mb-4">
        <label htmlFor="publicationDate" className="block text-gray-700 font-bold mb-2">
          Publication Date
        </label>
        <input
          type="date"
          id="publicationDate"
          className="form-input w-full"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Add Book
      </button>
    </form>
    </>
    
  );
};

export default AddBookForm;
