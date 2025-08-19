import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const [isLoggedin,setIsloggedin] = useState(false) 

  useEffect(() => {
    const storeData = localStorage.getItem('loggedIn')
    if(storeData === 'true'){
      setIsloggedin(true)
    }else{
      setIsloggedin(false)
    }
    
  }, [])
  
  const handleClick = async (req,res) => {
    const response = await fetch('http://localhost:3000/logout',{
      method:'POST',
      credentials:'include'
    })

    if(response.ok){
      localStorage.removeItem('loggedIn')
      setIsloggedin(false)
      console.log('logout successfully')
    }
  }

  return (
    <div className='flex justify-between px-40 py-10'>
      <div>
        <h1 className='text-3xl font-bold'>
          <NavLink to="/">Coding School</NavLink>
        </h1>
      </div>
      <div>
        <ul className='flex text-lg space-x-6 font-medium items-center'>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/free-course">Free Course</NavLink>
          </li>
          <li>
            <NavLink to="/paid-course">Paid Course</NavLink>
          </li>
          <li>
            <NavLink to="/contact-us">Contact Us</NavLink>
          </li>
          { !isLoggedin ?
          (
          <>
          <li>
            <NavLink 
              to="/sign-up" 
              className='px-5 py-3 bg-amber-300 rounded-2xl'
            >
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/login" 
              className='px-5 py-3 bg-cyan-300 rounded-2xl'
            >
              Login
            </NavLink>
          </li>
          </>
          ) : ( <li>
            <button 
              onClick={handleClick} 
              className='px-5 py-3 bg-cyan-300 rounded-2xl'
            >
              Logout
            </button>
          </li>
          )
          }
        </ul>
      </div>
    </div>
  )
}

export default Navbar