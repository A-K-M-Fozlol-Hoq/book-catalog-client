'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
// import { createUser } from '@/redux/features/user/userSlice';
import { useAppDispatch } from '@/redux/hook';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '@/redux/features/user/userApi';
import { toast } from 'react-toastify';
import { setUser } from '@/redux/features/user/userSlice';



export function SignupForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [signup, {  data, isError,  isSuccess }] = useSignupMutation();
  
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
      console.log(data)
      dispatch(setUser(data.data._doc.email));
      sessionStorage.setItem('token', data.data.accessToken);

      // navigate('/');
    }
  },[isError, isSuccess])

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    const data = {email, password}
    console.log(data);
    signup(data)
    // Handle signup submission here
    console.log('Signed up with:', email, password);
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
