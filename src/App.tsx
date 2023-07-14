import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from './layouts/MainLayout';
import { useAppDispatch } from './redux/hook';
import React, { useEffect } from 'react';
import { useGetMyProfileQuery } from "./redux/features/user/userApi";
import { setUser } from "./redux/features/user/userSlice";

function App() {
  const dispatch = useAppDispatch()
  const { data:profileData, isError: profileIsError } = useGetMyProfileQuery({accessToken: sessionStorage.getItem('accessToken')});

  React.useEffect(()=>{
    if(sessionStorage.getItem('accessToken')){
      if(profileIsError){
        sessionStorage.setItem('accessToken', "");
        toast("Something went wrong", {
          autoClose: 2500,
          type: "error",
        });
      }
      if(profileData){
        dispatch(setUser(profileData.data.email));
      }
    }
  },[dispatch, profileData,profileIsError]);
  
  return (
    <div>
      <MainLayout />
    <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
