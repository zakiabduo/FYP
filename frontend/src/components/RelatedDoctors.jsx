import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext)
  const [relatedDoc, setRelatedDoc] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelatedDoc(doctorsData)
    }
  }, [docId, speciality, doctors])

  const handleCardClick = (id) => {
    navigate(`/appointment/${id}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleMoreClick = () => {
    navigate(`/doctors`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='flex flex-col items-center gap-4 my-20 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto'>
      
      {/* Title Header Workspace */}
      <div className="text-center mb-6">
        <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight'>
          Related Specialists
        </h2>
        <p className='text-sm text-slate-400 mt-1.5 max-w-md mx-auto leading-relaxed'>
          Simply browse through alternative highly-trusted medical professionals in this specialization area.
        </p>
      </div>

      {/* Grid Architecture Layout Engine */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-4">
        {relatedDoc.slice(0, 5).map((item, index) => (
          <div 
            onClick={() => handleCardClick(item._id)} 
            className='group bg-white border border-slate-200/80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md hover:border-slate-300 -translate-y-0 hover:-translate-y-1.5 transition-all duration-300 flex flex-col' 
            key={item._id || index}
          >
            {/* Image Box Framing Container */}
            <div className="bg-slate-50 relative aspect-[4/4] overflow-hidden border-b border-slate-100 flex items-center justify-center">
              <img 
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' 
                src={item.image} 
                alt={item.name} 
              />
            </div>

            {/* Metadata Information Context Area */}
            <div className="p-4 flex flex-col flex-grow justify-between gap-3 bg-white">
              <div className="flex flex-col gap-1">
                <h3 className='text-slate-800 font-bold text-sm sm:text-base line-clamp-1 group-hover:text-indigo-600 transition-colors'>
                  {item.name}
                </h3>
                <p className='text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md w-fit'>
                  {item.speciality}
                </p>
              </div>

              {/* Dynamic Status Badges Pulse Engine */}
              <div className="pt-2.5 border-t border-slate-50 flex items-center gap-2">
                <div className="relative flex h-2 w-2 select-none">
                  {item.available ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </>
                  ) : (
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-400"></span>
                  )}
                </div>
                <span className={`text-xs font-bold ${item.available ? "text-emerald-600" : "text-slate-400"}`}>
                  {item.available ? "Available Now" : "On Leave"}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Modern Extended Call to Action Button Controller */}
      <div className="mt-6">
        <button 
          onClick={handleMoreClick}  
          className='bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-800 font-semibold px-10 py-3 rounded-xl text-sm transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-2'
        >
          View More Specialists
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

    </div>
  )
}

export default RelatedDoctors