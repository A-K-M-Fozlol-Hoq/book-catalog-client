import { useGetBooksQuery } from '@/redux/features/book/bookApi';
import { useEffect, useState } from 'react';
import ViewBooks from './ViewBooks';

const BookSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [books, setBooks] = useState([])

  const { data, isLoading } = useGetBooksQuery({
    searchTerm,
    genre: genreFilter,
    publicationYear: parseInt(yearFilter)
  });

  useEffect(()=>{
    console.log(data?.data, data?.data?.length, data?.data?.length>0)
    if(data?.data?.length>0 || data?.data?.length ===0 ){
        setBooks(data.data)
    }
  },[data, isLoading])


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book Search</h1>
      <form  className="mb-4">
        <input
          type="text"
          placeholder="Search by title, author, or genre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
        />
      </form>

      <div className="flex items-center mb-4">
        <label htmlFor="genre" className="mr-2">
          Genre:
        </label>
        <select
          id="genre"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
        >
          <option value="">All</option>
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

      <div className="flex items-center mb-4">
        <input
          placeholder="Publication Year"
          type="text"
          id="year"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
        />
      </div>

      {/* Render your book list here */}
      {
        books.length >0 &&
        <ViewBooks books={books} />
      }
    </div>
  );
};

export default BookSearch;
