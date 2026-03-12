import React, { useContext } from 'react'
import customLogo from "../../assets/main/Logo1.png";
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/react';
import { AppContext } from '../../context/AppContext';

const Navbar = () => {

  const {openSignIn} = useClerk()
  const {user} = useUser()
  const {navigate, isEducator} = useContext(AppContext)


  return (
    <div className='flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b-2 border-gray-500 py-4 bg-[#a9d6e5]'>
      
      <img onClick={()=> navigate('/')} src={customLogo} alt="Logo" className='w-28 lg:w-32 cursor-pointer' />

      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        
        <div className='flex items-center gap-5'>
        {user && <>
          <button onClick={()=> navigate('/educator')} className='cursor-pointer'>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
        <Link to='/my-enrollments'>My Enrollments</Link>
        </>
        }
        </div>

        {user ? <UserButton/> :
          <button onClick={()=> openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer'>
          Create Account
        </button>}

      </div>

    </div>
  )
}

export default Navbar