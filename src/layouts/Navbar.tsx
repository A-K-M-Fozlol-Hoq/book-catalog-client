
import { setUser } from '@/redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {  useNavigate } from 'react-router-dom';


export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    dispatch(setUser(""));
    sessionStorage.clear();
    navigate('/login');
  };

  const handleBooksClick = () => {
    navigate('/books');
  };

  const handleAddBook = () => {
    navigate('/add-new-book');
  };

  const handleWishList = () => {
    navigate('/wishlist');
  };

  const handleCurrentlyReading = () => {
    navigate('/currently-reading');
  };


  return (
    <nav className="flex items-center justify-between bg-gray-900 p-4">
    <div className="text-white text-xl font-bold ">Book Catalogue</div>
    {
      user.email?
      <div>
      <button
        className="text-white mx-2 bg-blue-700 py-1 px-2 rounded"
        onClick={handleLogoutClick}
      >
        Logout
      </button>
      
      
      <button
        className="text-white mx-2 bg-blue-700 py-1 px-2 rounded"
        onClick={handleBooksClick}
      >
        Books
      </button>

      <button
        className="text-white mx-2 bg-blue-700 py-1 px-2 rounded"
        onClick={handleAddBook}
      >
        Add Book
      </button>

      <button
        className="text-white mx-2 bg-blue-700 py-1 px-2 rounded"
        onClick={handleWishList}
      >
        Wish List 
      </button>

      <button
        className="text-white mx-2 bg-blue-700 py-1 px-2 rounded"
        onClick={handleCurrentlyReading}
      >
        Currently Reading
      </button>
    </div>
    :
    <div>
      <button
        className="text-white mx-2 bg-blue-700 py-1 px-2 rounded"
        onClick={handleLoginClick}
      >
        Login
      </button>

      <button
        className="text-white mx-2 bg-blue-700 py-1 px-2 rounded"
        onClick={handleBooksClick}
      >
        Books
      </button>
      
    </div>
    }
  </nav>
  );
}
