// BookDetails.tsx
import EditBookForm from '@/components/EditBookForm';
import React from 'react';
import {  useParams } from 'react-router-dom'; 



const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();


  return (
    <>
    <EditBookForm id={id}/>
    </>
  );
};

export default EditBook;
