import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // Ultra-modern dynamic link styling with indicator transitions
  const navLinkClass = ({ isActive }) =>
    `flex items-center justify-center md:justify-start gap-3.5 py-3 px-3 md:px-5 mx-2 rounded-xl transition-all duration-200 text-sm font-medium select-none cursor-pointer group active:scale-[0.98] ${
      isActive
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10 md:translate-x-1 font-semibold"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`;

  return (
    // Sticky configuration context wrapping layout container
    <div className="sticky top-[73px] h-[calc(100vh-73px)] w-16 md:w-72 bg-white border-r border-slate-200 pt-6 flex flex-col gap-1 transition-all duration-300 shrink-0 overflow-y-auto">
      
      {/* Admin Navigation Flow */}
      {aToken && (
        <ul className="flex flex-col gap-1.5 w-full">
          <div className="px-6 mb-2 hidden md:block">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Admin Controls</span>
          </div>
          
          <NavLink to="/admin-dashboard" className={navLinkClass}>
            <img 
              src={assets.home_icon} 
              alt="Dashboard" 
              className="w-6 h-6 md:w-5 md:h-5 object-contain min-w-[24px] transition-all duration-200 group-hover:scale-105 brightness-0 group-[.text-white]:brightness-0 group-[.text-white]:invert" 
            />
            <span className="hidden md:block">Dashboard</span>
          </NavLink>
          
          <NavLink to="/all-appointments" className={navLinkClass}>
            <img 
              src={assets.appointment_icon} 
              alt="Appointments" 
              className="w-6 h-6 md:w-5 md:h-5 object-contain min-w-[24px] transition-all duration-200 group-hover:scale-105 brightness-0 group-[.text-white]:brightness-0 group-[.text-white]:invert" 
            />
            <span className="hidden md:block">Appointments</span>
          </NavLink>
          
          <NavLink to="/add-doctor" className={navLinkClass}>
            <img 
              src={assets.add_icon} 
              alt="Add Doctor" 
              className="w-6 h-6 md:w-5 md:h-5 object-contain min-w-[24px] transition-all duration-200 group-hover:scale-105 brightness-0 group-[.text-white]:brightness-0 group-[.text-white]:invert" 
            />
            <span className="hidden md:block">Add Doctor</span>
          </NavLink>
          
          <NavLink to="/doctor-list" className={navLinkClass}>
            <img 
              src={assets.people_icon} 
              alt="Doctors List" 
              className="w-6 h-6 md:w-5 md:h-5 object-contain min-w-[24px] transition-all duration-200 group-hover:scale-105 brightness-0 group-[.text-white]:brightness-0 group-[.text-white]:invert" 
            />
            <span className="hidden md:block">Doctors List</span>
          </NavLink>
        </ul>
      )}

      {/* Doctor Navigation Flow */}
      {dToken && (
        <ul className="flex flex-col gap-1.5 w-full">
          <div className="px-6 mb-2 hidden md:block">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Doctor Panel</span>
          </div>
          
          <NavLink to="/doctor-dashboard" className={navLinkClass}>
            <img 
              src={assets.home_icon} 
              alt="Dashboard" 
              className="w-6 h-6 md:w-5 md:h-5 object-contain min-w-[24px] transition-all duration-200 group-hover:scale-105 brightness-0 group-[.text-white]:brightness-0 group-[.text-white]:invert" 
            />
            <span className="hidden md:block">Dashboard</span>
          </NavLink>
          
          <NavLink to="/doctor-appointments" className={navLinkClass}>
            <img 
              src={assets.appointment_icon} 
              alt="Appointments" 
              className="w-6 h-6 md:w-5 md:h-5 object-contain min-w-[24px] transition-all duration-200 group-hover:scale-105 brightness-0 group-[.text-white]:brightness-0 group-[.text-white]:invert" 
            />
            <span className="hidden md:block">Appointments</span>
          </NavLink>
          
          <NavLink to="/doctor-profile" className={navLinkClass}>
            <img 
              src={assets.people_icon} 
              alt="Profile" 
              className="w-6 h-6 md:w-5 md:h-5 object-contain min-w-[24px] transition-all duration-200 group-hover:scale-105 brightness-0 group-[.text-white]:brightness-0 group-[.text-white]:invert" 
            />
            <span className="hidden md:block">Profile</span>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;