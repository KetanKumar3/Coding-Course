import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
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
        </ul>
      </div>
    </div>
  )
}

export default Navbar