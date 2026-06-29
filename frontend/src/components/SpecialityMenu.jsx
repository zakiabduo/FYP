import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  
  // Refined smooth scroll behavior configuration
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='flex flex-col items-center gap-4 py-16 px-4 max-w-7xl mx-auto' id='speciality'>
      
      {/* Section Typography Headers */}
      <div className="text-center mb-4">
        <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight'>
          Find By Speciality
        </h2>
        <p className='text-sm text-slate-400 mt-1.5 max-w-sm mx-auto leading-relaxed'>
          Simply browse through our extensive list of highly-verified specialized experts.
        </p>
      </div>

      {/* Horizontal Scroll Carousel: Hidden scrollbar with smooth touch properties */}
      <div className='flex items-center gap-5 sm:gap-8 pt-6 w-full overflow-x-auto justify-start sm:justify-center no-scrollbar pb-4 select-none scroll-smooth'>
        {specialityData.map((items, index) => (
          <Link
            key={index}
            to={`/doctors/${items.speciality}`}
            onClick={handleScrollTop} 
            className='flex flex-col items-center gap-2.5 text-center cursor-pointer shrink-0 group transition-all duration-300'
          >
            {/* Round Icon Framing Box */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-3 transition-all duration-300 group-hover:bg-indigo-50 group-hover:border-indigo-100 group-hover:-translate-y-2 group-hover:shadow-md group-hover:shadow-indigo-600/5">
              <img 
                className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-105' 
                src={items.image} 
                alt={items.speciality} 
              />
            </div>
            
            <p className='text-slate-600 group-hover:text-indigo-600 font-semibold text-xs sm:text-sm transition-colors tracking-wide'>
              {items.speciality}
            </p>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default SpecialityMenu