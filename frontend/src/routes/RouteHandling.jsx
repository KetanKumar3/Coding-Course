import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HeroSection from '../pages/HeroSection';
import SignupSection from '../pages/SignupSection';
import Login from '../components/Login';


const RouteHandling = () => {
    
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HeroSection />
        },
        {
            path: '/sign-up',
            element: <SignupSection />
        },
        {
            path: '/login',
            element: <Login />
        }
    ]);

    

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default RouteHandling;