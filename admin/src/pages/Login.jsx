import React, { useState } from 'react';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(
          backendUrl + '/api/admin/login',
          { email, password }
        );

        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          backendUrl + '/api/doctor/login',
          { email, password }
        );

        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
          console.log(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-xl rounded-2xl p-6 sm:p-10 transition-all duration-300">
        
        {/* Modern Segmented Role Switcher Tab */}
        <div className="p-1 bg-slate-100 rounded-xl flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={() => setState('Admin')}
            className={`w-1/2 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 select-none cursor-pointer ${
              state === 'Admin'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Admin Account
          </button>
          <button
            type="button"
            onClick={() => setState('Doctor')}
            className={`w-1/2 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 select-none cursor-pointer ${
              state === 'Doctor'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Doctor Portal
          </button>
        </div>

        {/* Heading Descriptor */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Sign In As {state}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Please enter your authenticated credentials below to continue.
          </p>
        </div>

        {/* Credentials Form Layout */}
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
          
          {/* Email Input Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Email Address
            </label>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              type="email"
              placeholder="name@hospital.com"
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
          </div>

          {/* Password Input Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Password
            </label>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
              type="password"
              placeholder="••••••••"
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
          </div>

          {/* Core Submission CTA Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium text-sm transition-all shadow-md shadow-indigo-600/10 active:scale-[0.99] mt-2 cursor-pointer"
          >
            Authorize & Login
          </button>
          
        </form>
        
      </div>
    </div>
  )
}

export default Login