
import { setUser } from '@/redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()
  const handleLogout = ()=>{
    console.log("on por")
  }

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


  return (
    <nav className="flex items-center justify-between bg-gray-900 p-4">
    <div className="text-white text-xl font-bold">Book Catalogue</div>
    {
      user.email?
      <div>
      <button
        className="text-white mx-2"
        onClick={handleLogoutClick}
      >
        Logout
      </button>
      <button
        className="text-white mx-2"
        onClick={handleBooksClick}
      >
        Books
      </button>
    </div>
    :
    <div>
      <button
        className="text-white mx-2"
        onClick={handleLoginClick}
      >
        Login
      </button>
    </div>
    }
  </nav>
  );
}
