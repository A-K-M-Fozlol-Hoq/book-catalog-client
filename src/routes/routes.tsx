import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Signup from '@/pages/Signup';
import AddBook from '@/pages/AddBook';
import PrivateRoute from './PrivateRoute';
import BookSearch from '@/pages/Books';
import Books from '@/pages/Books';
import BookDetails from '@/pages/BookDetails';
import EditBook from '@/pages/EditBook';
import Wishlist from '@/pages/WishList';
import CurrentlyReading from '@/pages/CurrentlyReading';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/add-new-book',
        element: <PrivateRoute><AddBook /></PrivateRoute> ,
      },
      {
        path: '/book-details/:id', 
        element: <BookDetails />,
      },
      {
        path: '/edit-book/:id', 
        element: <PrivateRoute><EditBook /></PrivateRoute>
      },
      {
        path: '/books',
        element:<Books />  ,
      },
      {
        path: '/wishlist',
        element:<PrivateRoute><Wishlist /></PrivateRoute> ,
      },
      {
        path: '/currently-reading',
        element: <PrivateRoute><CurrentlyReading /></PrivateRoute> ,
      },
    ],
  },
  
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
