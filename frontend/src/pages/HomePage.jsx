import React from 'react';
import Home from '../components/Home';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">User Management</h1>
      <Home />
    </div>
  );
};

export default HomePage;
