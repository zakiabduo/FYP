import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
  }

  return (
    <div className="w-full border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8 py-3.5 sticky top-0 z-20 shadow-sm/50">
      <div className="flex items-center justify-between">
        
        {/* Left Side: Identity */}
        <div className="flex items-center gap-3">
          <img
            src={assets.admin_logo}
            alt="logo"
            className="w-10 sm:w-12 h-auto object-contain cursor-pointer active:scale-95 transition-transform"
            onClick={() => navigate(aToken ? '/admin-dashboard' : '/doctor-dashboard')}
          />

          {/* Dynamic Role Badges based on active token context */}
          {aToken ? (
            <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
              Admin Portal
            </span>
          ) : dToken ? (
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">
              Doctor Portal
            </span>
          ) : null}
        </div>

        {/* Right Side: Quick Action Control */}
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-slate-600 hover:text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-100 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
        >
          {/* Lightweight logout icon arrow stroke */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
        
      </div>
    </div>
  )
}

export default Navbar