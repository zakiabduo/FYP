import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banners = () => {
  const navigate = useNavigate()

  const handleActionClick = () => {
    navigate('/login')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='bg-indigo-600 flex rounded-3xl px-6 sm:px-10 md:px-14 lg:px-20 my-16 md:mx-10 shadow-xl shadow-indigo-600/10 relative overflow-hidden transition-all duration-300 hover:shadow-indigo-600/20'>
      
      {/* Decorative Background Glow Pattern */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-72 h-72 bg-indigo-500/30 rounded-full blur-2xl pointer-events-none"></div>

      {/* Left Side: Content Box */}
      <div className='flex-1 py-10 sm:py-14 md:py-20 lg:py-24 z-10'>
        <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight'>
          <h2>Book Appointment</h2>
          <p className='mt-3 font-medium text-indigo-100 text-lg sm:text-xl md:text-2xl'>
            with 100+ Trusted Doctors
          </p>
        </div>
        
        <div className="mt-8">
          <button 
            onClick={handleActionClick} 
            className='bg-white text-indigo-600 font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:bg-indigo-50 active:scale-[0.98] cursor-pointer shadow-md shadow-black/5 text-sm sm:text-base'
          >
            Create Account
          </button>
        </div>
      </div>

      {/* Right Side: Doctor Visual Asset Image */}
      <div className='hidden md:block md:w-1/2 lg:w-[380px] relative self-end h-full min-h-[280px] lg:min-h-[340px]'>
        <img 
          className='w-full absolute bottom-0 right-0 max-w-sm object-contain object-bottom transition-transform duration-500 hover:scale-[1.02]' 
          src={assets.appointment_img} 
          alt="Doctors Booking Banner" 
        />
      </div>

    </div>
  )
}

export default Banners