import React, { useState } from 'react';
import { GiCancel } from "react-icons/gi";
import { NavLink, useNavigate } from 'react-router-dom';


const Login = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/login',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user),
            credentials:'include'
        })
        
        const data = await response.json()

        if(response.ok){
            console.log("frontend",data)
            localStorage.setItem('loggedIn',true)
            navigate('/')
        }
    };

    const handleClose = () => {
        navigate('/')
    };

    return (
        
        <div className='min-h-screen flex justify-center items-center'>
            <div className='w-96 p-8 bg-gray-800 text-white rounded-xl shadow-lg'>
                <div className='flex justify-end'>
                    <button 
                        onClick={handleClose} 
                        className='text-2xl hover:text-red-500 transition-colors'
                        aria-label="Close form"
                    >
                        <GiCancel />
                    </button>
                </div>
                
                <h2 className='text-3xl font-bold text-center mb-6'>Login to Coding School</h2>
                
                <form onSubmit={handleSubmit} className='space-y-4'>
                    
                    
                    <div>
                        <label htmlFor='email' className='block mb-1 text-sm font-medium'>Email</label>
                        <input 
                            type='email'
                            id='email'
                            name='email'
                            value={user.email} 
                            className='w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-500' 
                            onChange={handleChange} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor='password' className='block mb-1 text-sm font-medium'>Password</label>
                        <input 
                            type='password' 
                            id='password'
                            name='password'
                            value={user.password} 
                            className='w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-cyan-500' 
                            onChange={handleChange} 
                        />
                    </div>
                    
                    <button 
                        type='submit' 
                        className='w-full py-3 mt-6 bg-cyan-500 rounded-lg text-lg font-bold hover:bg-cyan-600 transition-colors'
                    >
                        Submit
                    </button>

<p className='text-center text-sm'>
                        Are you new here? {' '}
                        <NavLink 
                            to='/sign-up'
                            className='text-cyan-400 font-bold hover:text-cyan-300 transition-colors'
                        >
                            Signup
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;