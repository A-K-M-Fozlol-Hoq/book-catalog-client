import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from './layouts/MainLayout';
import { useAppDispatch } from './redux/hook';
import { useEffect } from 'react';

function App() {
  // const dispatch = useAppDispatch()
  // useEffect(()=>{
  // },[])
  
  return (
    <div>
      <MainLayout />
    <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
