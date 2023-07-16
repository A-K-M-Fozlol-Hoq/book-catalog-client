import { LoginForm } from '@/components/LoginForm';
import { useAppSelector } from '@/redux/hook';
import React from 'react';
import {  useLocation } from 'react-router-dom';

interface IProps{
    children: React.ReactNode;
}

const PrivateRoute = ({children}: IProps) => {
    const { user, isLoading} = useAppSelector((state)=> state.user)
    const { pathname } = useLocation()

    if(isLoading){
        return <p>Loading...</p>
    }
    if(!user.email && !isLoading){
        return <LoginForm redirectPath={pathname} />;
    }

    // if(user.email && !isLoading){
    //     return <p>Loading...</p>
    // }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;