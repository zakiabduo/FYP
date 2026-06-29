import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
  
  const handleScrollToSpeciality = (e) => {
    e.preventDefault();
    const target = document.querySelector('#speciality');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='bg-indigo-600 rounded-3xl my-6 md:mx-10 overflow-hidden shadow-xl shadow-indigo-600/10'>
      {/* Main Flex Grid Wrapper */}
      <div className='flex flex-col md:flex-row items-stretch min-h-[420px] md:min-h-[480px] lg:min-h-[520px] relative w-full'>
        
        {/* Abstract Background Light Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Left Side: Content Section */}
        <div className='w-full md:w-1/2 flex flex-col justify-center items-start gap-6 p-6 sm:p-10 md:p-12 lg:p-16 z-10'>
          
          <h1 className='font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight text-center md:text-left w-full md:w-auto'>
            Book Appointment <br className="hidden sm:block"/> With Trusted Doctors
          </h1>
          
          {/* Social Profiles Proof Bar */}
          <div className='flex flex-col sm:flex-row items-center gap-3.5 text-white bg-indigo-700/40 p-3 rounded-2xl border border-white/10 backdrop-blur-sm mx-auto md:mx-0'>
            <img 
              className='w-24 h-auto object-contain shrink-0' 
              src={assets.group_profiles} 
              alt="Verified Users" 
            />
            <p className="text-indigo-100 text-center sm:text-left text-xs sm:text-sm font-medium leading-relaxed">
              Browse through our extensive list of highly-verified healthcare experts.
            </p>
          </div>

          {/* Action Trigger Call to Action Button */}
          <div className="w-full md:w-auto flex justify-center md:justify-start mt-2">
            <button 
              onClick={handleScrollToSpeciality}
              className='inline-flex items-center gap-2.5 bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl text-sm hover:bg-indigo-50 active:scale-[0.98] transition-all duration-200 shadow-md cursor-pointer group'
            >
              Book Appointment 
              <img 
                className='w-3.5 h-auto transition-transform duration-200 group-hover:translate-x-1' 
                src={assets.arrow_icon} 
                alt="" 
              />
            </button>
          </div>

        </div>
         
        {/* Right Side: Image Hero Frame Box */}
        <div className='w-full md:w-1/2 flex items-end justify-center relative px-6 md:px-0 mt-6 md:mt-0'>
          <img 
            className='w-full max-w-sm md:max-w-none md:w-[90%] lg:w-[85%] h-auto max-h-[100%] object-contain object-bottom block' 
            src={assets.header_img} 
            alt="Healthcare Specialists Group" 
          />
        </div>

      </div>
    </div>
  )
}

export default Header