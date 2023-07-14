'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
// import { createUser } from '@/redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useNavigate } from 'react-router-dom';
import { useGetMyProfileQuery, useSignupMutation } from '@/redux/features/user/userApi';
import { toast } from 'react-toastify';
import { setUser } from '@/redux/features/user/userSlice';


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



export function SignupForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [signup, {  data, isError,  isSuccess }] = useSignupMutation();
  const { user } = useAppSelector((state) => state.user);
  const { data:profileData, isError: profileIsError } = useGetMyProfileQuery({accessToken: sessionStorage.getItem('accessToken')});
  console.log(user)

  React.useEffect(()=>{
    if(user.email){
      navigate('/');
    }else if(sessionStorage.getItem('accessToken')){
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
  },[user.email, navigate, profileData, profileIsError, dispatch]);
  
  React.useEffect(()=>{
    if(isError){
      toast("Something went wrong", {
        autoClose: 2500,
        type: "error",
      });
    }
    if(isSuccess){
      toast("User created successfully", {
        autoClose: 2500,
        type: "success",
      });
      dispatch(setUser(data.data._doc.email));
      sessionStorage.setItem('accessToken', data.data.accessToken);
      navigate('/');
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

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    const data = {email, password}
    if(!validateEmail(email)){
      toast("Please enter valid email", {
        autoClose: 2500,
        type: "error",
      });
      return;
    }

    if(password.length<6){
      toast("Minimum length of password should be 6", {
        autoClose: 2500,
        type: "error",
      });
      return;
    }
    
    signup(data)
  };

  const switchToLogin = () => {
    navigate('/login');
  };

  return (
    <>
    <h2 className="text-2xl mb-6">Sign Up</h2>
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
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{' '}
        <button
          className="text-blue-500 underline focus:outline-none"
          onClick={switchToLogin}
        >
          Login
        </button>
      </p>
      </>
  );
}
