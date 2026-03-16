import React from 'react';
import { assets } from '../../assets/assets/assets';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 h-15 flex flex-row flex-col-reverse items-center justify-between bg-black text-white text-left w-full px-8 border-t">
      <div className='flex items-center gap-4'>
        <img className='w-40' src={assets.logo_dark} alt="logo" />
      </div>
      <div className='h-7'>
        <p>Share your courses:</p>
        </div>
    </footer>
  );
};

export default Footer;