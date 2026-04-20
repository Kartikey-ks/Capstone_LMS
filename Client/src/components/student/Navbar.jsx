import React, { useContext } from 'react'
import { assets } from "../../assets/assets/assets.js";
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser, useAuth } from '@clerk/react';
import { AppContext } from '../../context/AppContext';
import SearchBar from './SearchBar';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {

  const {openSignIn} = useClerk()
  const {user} = useUser()
  const {navigate, isEducator, backendUrl, setIsEducator} = useContext(AppContext)
  const { getToken } = useAuth()

  const becomeEducator = async () => {
  try {
    if (isEducator) {
      navigate('/educator');
      return;
    }

    const token = await getToken();

    const { data } = await axios.get(
      backendUrl + '/api/educator/update-role',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setIsEducator(true);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error.message);
  }
};


  return (
    <div className='sticky top-0 z-50 flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b-2 border-gray-500 py-4 bg-[#a9d6e5]'>
      
      <img onClick={()=> navigate('/')} src={assets.logo_light} alt="Logo" className='w-28 lg:w-32 cursor-pointer' />

      <SearchBar/>

      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        
        <div className='flex items-center gap-5'>
        {user && <>
          <button onClick={becomeEducator} className='px-4 py-1.5 rounded-full bg-[#333] text-sm font-medium text-white cursor-pointer'>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
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