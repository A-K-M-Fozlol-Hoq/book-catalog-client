import {  useEditBookMutation, useGetSingleBookQuery } from '@/redux/features/book/bookApi';
import { useAppSelector } from '@/redux/hook';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const EditBookForm = ({id=''}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('Fantasy');
  const [publicationDate, setPublicationDate] = useState('');
  const [editBook, { isError,  isSuccess }] = useEditBookMutation();
  
  const { data:book, isError:bookIsError, isLoading:bookIsLoading, refetch: refetchBook, } = useGetSingleBookQuery({id});
  const { user } = useAppSelector((state) => state.user);



  useEffect(()=>{
    if(bookIsError){
      toast("Failed to find book from database", {
        autoClose: 2500,
        type: "error",
      });
    }

    if(isError){
      toast("Failed to edit book", {
        autoClose: 2500,
        type: "error",
      });
    }

    if(isSuccess){
      refetchBook()
      toast("Book edited successfully", {
        autoClose: 2500,
        type: "success",
      });
    }
  }, [isError, isSuccess, bookIsError])
  
  useEffect(()=>{
    if(book){
      setTitle(book?.data?.title)
      setAuthor(book?.data?.author)
      setGenre(book?.data?.genre)
      setPublicationDate(book?.data?.publicationDate)
    }
  }, [book])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const publicationYear = publicationDate ? new Date(publicationDate).getFullYear() : 2000;
    if(!genre){
      toast("Please select a genre", {
        autoClose: 2500,
        type: "error",
      });
      return ;
    }
    const postData = {
      accessToken: sessionStorage.getItem('accessToken'),
      data:{
        title,
        author,
        genre,
        publicationDate,
        publicationYear,
        ownerEmail: user.email
      }, 
      id
    }
    editBook(postData)

  };

  if(bookIsLoading){
    return(<h1 className='text-3xl font-bold mb-4 text-center'>Loadng...</h1>)
  }

  if(!bookIsLoading && !book){
    return(<h1 className='text-3xl font-bold mb-4 text-center'>Book Not Found</h1>)
  }


  return (
    <>
    <h2 className="text-2xl mb-6 text-center">Edit Book</h2>
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
          />
        </div>
        <div className="mb-4">
        <label htmlFor="genre" className="block text-gray-700 font-bold mb-2">
        Genre:
        </label>

        {/* <div className="flex items-center mb-4">
        <label htmlFor="genre" className="mr-2">
          Genre:
        </label> */}
        <select
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded-md"
        >
          <option value="Fantasy">Fantasy</option>
          <option value="Romance">Romance</option>
          <option value="Fiction">Fiction</option>
          <option value="Biography">Biography</option>
          <option value="Poet">Poet</option>
          <option value="Poetry">Poetry</option>
          <option value="History">History</option>
          <option value="Poet">Poet</option>
          <option value="Mystery">Mystery</option>
          <option value="Drama">Drama</option>
          <option value="Non-Fiction">Non-Fiction</option>
        </select>
      </div>

          {/* <input
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
           type="text"
           id="genre"
           value={genre}
           onChange={(e) => setGenre(e.target.value)}
           required
          /> */}
        {/* </div> */}
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
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Edit Book
      </button>
    </form>
    </>
    
  );
};

export default EditBookForm;
