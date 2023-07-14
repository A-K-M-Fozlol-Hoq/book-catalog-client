import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import logo from '../assets/images/technet-logo-white.png';
import { LoginForm } from '@/components/LoginForm';
import { useState } from 'react';

export default function Login() {
  
  return (
    <>
      <div className="container mx-auto max-w-xs mt-20">
     <LoginForm/>
    </div>
    </>
  );
}
