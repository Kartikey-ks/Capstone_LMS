import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets/assets';
import { AppContext } from '../../context/AppContext';

const Sidebar = () => {

  const { isEducator } = useContext(AppContext);

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ];

  if (!isEducator) return null;

  return (
    <div className='w-64 border-r min-h-screen text-base border-gray-300 py-4 flex flex-col'>
      {menuItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          end={item.path === '/educator'}
          className={({ isActive }) =>
            `flex items-center px-6 py-3 gap-3 ${
              isActive
                ? 'bg-indigo-50 border-r-4 border-indigo-500 font-medium'
                : 'hover:bg-gray-100'
            }`
          }
        >
          <img src={item.icon} alt="" className="w-5 h-5" />
          <p>{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;