import React, { useContext,  useState, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const Doctors = () => {
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const [showFilter, setShowFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const navigation = useNavigate()

  // Pre-defined specialities array for cleaner list rendering
  const specialitiesList = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist"
  ]

  // Optimized Search + Route Speciality Filtering with useMemo
  const filteredDoctors = useMemo(() => {
    let result = [...doctors]

    // 1. Filter by route speciality parameter if it exists
    if (speciality) {
      result = result.filter(
        (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
      )
    }

    // 2. Filter by search query input (Checks Doctor Name and Speciality)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(
        (doc) =>
          doc.name.toLowerCase().includes(query) ||
          doc.speciality.toLowerCase().includes(query)
      )
    }

    return result
  }, [doctors, speciality, searchQuery])

  const handleSpecialityToggle = (specName) => {
    // If the clicked speciality is already active, remove filter (go back to /doctors)
    if (speciality?.toLowerCase() === specName.toLowerCase()) {
      navigation('/doctors')
    } else {
      navigation(`/doctors/${specName}`)
    }
  }

  const handleCardClick = (id) => {
    navigation(`/appointment/${id}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto py-6">
      
      {/* Top Header & Search Bar Bar Section */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
            Browse Our Specialists
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
            Filter doctors by department or search directly by their name.
          </p>
        </div>

        {/* Dynamic Search Box Layout */}
        <div className="relative flex items-center w-full md:max-w-md">
          <span className="absolute left-4 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctor's name or medical branch..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium shadow-inner"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")} 
              className="absolute right-3.5 px-2 py-1 rounded-md text-slate-400 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main Structural Layout System */}
      <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-8 mt-4">
        
        {/* Mobile Filter Expand Controls */}
        <button 
          onClick={() => setShowFilter(prev => !prev)}
          className={`w-full md:hidden flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-[0.99] cursor-pointer ${
            showFilter ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700'
          }`} 
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 8.293A1 1 0 013 7.586V4z" />
          </svg>
          {showFilter ? "Close Filters" : "Filter By Specialities"}
        </button>

        {/* Sidebar Speciality Filters */}
        <div className={`w-full md:w-64 flex-col gap-2 shrink-0 ${showFilter ? "flex animate-in fade-in slide-in-from-top-2 duration-200" : "hidden md:flex"}`}> 
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-3 mb-1 hidden md:block">Clinical Categories</p>
          {specialitiesList.map((spec, index) => {
            const isTargetActive = speciality?.toLowerCase() === spec.toLowerCase();
            return (
              <button
                key={index}
                onClick={() => handleSpecialityToggle(spec)} 
                className={`w-full text-left pl-4 pr-3 py-3 border rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer group active:scale-[0.99] select-none ${
                  isTargetActive 
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10 md:translate-x-1" 
                    : "bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                {spec}
              </button>
            )
          })}
        </div>

        {/* Doctors Cards Response Grid Layout */}
        <div className="flex-1 w-full">
          {filteredDoctors.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center text-center p-12 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <div className="p-4 bg-slate-50 text-slate-400 rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-800">No Doctors Found</h3>
              <p className="text-xs text-slate-400 font-medium max-w-xs mt-1">
                We couldn't find any healthcare professionals matching your filters. Try a different search term.
              </p>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredDoctors.map((item, index) => (
                <div 
                  key={item._id || index}
                  onClick={() => handleCardClick(item._id)} 
                  className='group bg-white border border-slate-200/80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md hover:border-slate-300 -translate-y-0 hover:-translate-y-1.5 transition-all duration-300 flex flex-col'
                >
                  {/* Image Frame Container */}
                  <div className="bg-slate-50 relative aspect-[4/4] overflow-hidden border-b border-slate-100 flex items-center justify-center">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 block" 
                      src={item.image} 
                      alt={item.name} 
                    />
                  </div>
                  
                  {/* Details Card Block */}
                  <div className="p-4 flex flex-col flex-grow justify-between gap-3 bg-white">
                    <div className="flex flex-col gap-1">
                      <h3 className='text-slate-800 font-bold text-sm sm:text-base line-clamp-1 group-hover:text-indigo-600 transition-colors'>
                        {item.name}
                      </h3>
                      <p className='text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md w-fit'>
                        {item.speciality}
                      </p>
                    </div>

                    {/* Live Status Indicator Pulse */}
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
          )}
        </div>

      </div>
    </div>
  )
}

export default Doctors