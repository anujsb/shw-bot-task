import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <h1 className='text-4xl'>Home</h1>
      <div className='flex flex-col gap-2 items-center justify-center p-10 bg-white rounded-lg mt-4'>
        <button className='bg-blue-500 p-2 rounded-md text-white w-56' onClick={() => handleNavigation('/agent-login')}>Agent Login</button>
        <button className='bg-blue-500 p-2 rounded-md text-white w-full' onClick={() => handleNavigation('/user-login')}>User Login</button>
      </div>
    </div>
  );
};

export default Home;