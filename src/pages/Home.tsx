import ViewBooks from '@/components/ViewBooks';
import Footer from '@/layouts/Footer';
import { useGetBooksQuery } from '@/redux/features/book/bookApi';
import { useEffect, useState } from 'react';

export default function Home() {
  const [books, setBooks] = useState([])

  const { data, isLoading } = useGetBooksQuery({
    limit:10,
  });

  useEffect(()=>{
    console.log(data?.data, data?.data?.length, data?.data?.length>0)
    if(data?.data?.length>0 || data?.data?.length ===0 ){
        setBooks(data.data)
        console.log(data.data)
    }
  },[data, isLoading])

  if(isLoading){
    return <p className='text-3xl font-bold mb-4 text-center'>Loading...</p>
  }

  if(!isLoading && books.length === 0){
    return <p className='text-3xl font-bold mb-4 text-center'>No Book found</p>
  }

  return (
    <>
      <ViewBooks books={books} />
      <Footer />
    </>
  );
}
