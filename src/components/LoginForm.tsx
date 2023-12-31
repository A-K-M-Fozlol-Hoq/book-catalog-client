'use client';

import * as React from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUser } from '@/redux/features/user/userSlice';
import { useGetMyProfileQuery, useLoginMutation } from '@/redux/features/user/userApi';


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm({redirectPath="/"}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [login, {  data, isError,  isSuccess }] = useLoginMutation();
  const { user } = useAppSelector((state) => state.user);
  const { data:profileData, isError: profileIsError } = useGetMyProfileQuery({accessToken: sessionStorage.getItem('accessToken')});

  React.useEffect(()=>{
    if(user.email){
      navigate('/');
    }else if(sessionStorage.getItem('accessToken')){
      console.log({s: sessionStorage.getItem('accessToken')})
      if(profileIsError){
        sessionStorage.setItem('accessToken', "");
        toast("Something went wrong", {
          autoClose: 2500,
          type: "error",
        });
      }
      if(profileData){
        console.log(profileData)
        dispatch(setUser(profileData.data.email));
      }
    }
  },[user.email, navigate, profileData, profileIsError, dispatch]);
  
  React.useEffect(()=>{
    if(isError){
      toast("Something went wrong", {
        autoClose: 2500,
        type: "error",
      });
    }
    if(isSuccess){
      toast("User logged in successfully", {
        autoClose: 2500,
        type: "success",
      });
      // console.log(data.data.email)
      dispatch(setUser(data.data.email));
      sessionStorage.setItem('accessToken', data.data.accessToken);
      navigate(redirectPath);
    }
  },[isError, isSuccess])

  function validateEmail(email:string) {
    return EMAIL_REGEX.test(email);
  }
  

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = {email, password}
    if(!validateEmail(email)){
      toast("Please enter valid email", {
        autoClose: 2500,
        type: "error",
      });
      return;
    }
    login(data)
  };

  const switchToSignup = () => {
    navigate('/signup');
  };
  return (
    <>
     <h2 className="text-2xl mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{' '}
        <button
          className="text-blue-500 underline focus:outline-none"
          onClick={switchToSignup}
        >
          Sign Up
        </button>
      </p></>
  );
}
