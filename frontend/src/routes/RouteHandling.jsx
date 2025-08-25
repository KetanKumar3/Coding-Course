import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HeroSection from '../pages/HeroSection';
import SignupSection from '../pages/SignupSection';
import Login from '../components/Login';
import ProtectedRoute from '../pages/ProtectedRoute';
import PaidCourse from '../pages/PaidCourse';


const RouteHandling = () => {
    
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HeroSection />
        },
        {
            path: '/paid-course',
            element: <ProtectedRoute>
                <PaidCourse />
            </ProtectedRoute>
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