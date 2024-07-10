'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import LabelledInput from './LabelledInput';
import { FloatingNav } from '../ui/FloatingNavbar';
import { navItems } from '@/data';
import Footer from '../landing-page/Footer';
import { useSession } from 'next-auth/react';

const SignupPage: React.FC = () => {
  const session = useSession();
  const [formvalues, setFormvalues] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormvalues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', { email: formvalues.email, password: formvalues.password });
      if (res.status === 200) {
        signIn();
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <div>
      <FloatingNav navItems={navItems} />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0E093A] to-[#1D1450] text-purple2-300 p-10 relative">
      <img src="/landing-page/bg2.webp" alt="Background" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="relative z-10 w-full max-w-md p-8 bg-gradient-to-r from-purple2-800 to-zinc-800 shadow-lg rounded-lg border border-gray-700">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">Create a new account</h2>
        <p className="text-center text-gray-400 mb-6">Welcome back! Please enter your details.</p>
        <form onSubmit={handleSubmit}>
          <LabelledInput id="email" type="email" value={formvalues.email} onChange={handleChange} label="Email" />
          <LabelledInput id="password" type="password" value={formvalues.password} onChange={handleChange} label="Password" />
          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 bg-gradient-to-b from-[#935CFA] to-[#8749f9] text-white font-semibold rounded-md focus:ring-2 focus:ring-purple-500"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-400">Don't have an account? <a href="/signup" className="text-purple-400 hover:underline">Sign Up</a></p>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default SignupPage;
