import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { SignupForm } from '../components/SignUpForm';
import { Link } from 'react-router-dom';
import logo from '../assets/images/technet-logo-white.png';

export default function Signup() {
  return (
    <>
       <div className="container mx-auto max-w-xs mt-20">
      <SignupForm/>
    </div>
    </>
  );
}
