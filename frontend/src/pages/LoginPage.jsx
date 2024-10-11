import React from 'react';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      <Login />
    </div>
  );
};

export default LoginPage;
