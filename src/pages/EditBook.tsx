// BookDetails.tsx
import EditBookForm from '@/components/EditBookForm';
import { useAddReviewMutation, useGetSingleBookQuery } from '@/redux/features/book/bookApi';
import { useAppSelector } from '@/redux/hook';
import React, { useEffect, useState } from 'react';
import {   useParams } from 'react-router-dom'; // Assuming you are using React Router for navigation
import { toast } from 'react-toastify';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  ownerEmail: string;
}

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();


  return (
    <>
    <EditBookForm id={id}/>
    </>
  );
};

export default EditBook;
