import React from 'react';
import Register from '../components/Register';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Register</h1>
      <Register />
    </div>
  );
};

export default RegisterPage;
