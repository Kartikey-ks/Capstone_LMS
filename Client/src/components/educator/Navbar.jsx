import React from "react";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/react";
import { assets, dummyEducatorData } from "../../assets/assets/assets"; // adjust path if needed

const Navbar = () => {
  const educatorData = dummyEducatorData;
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between px-6 py-3 shadow-md bg-white">
      
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo_light}
          alt="Logo"
          className="w-28 lg:w-32 cursor-pointer"
        />
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <p className="text-gray-700 font-medium">
          Hi! {user ? user.fullName : "Developers"}
        </p>

        {user ? (
          <UserButton />
        ) : (
          <img
            className="w-8 h-8 rounded-full"
            src={assets.profile_img}
            alt="profile"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;