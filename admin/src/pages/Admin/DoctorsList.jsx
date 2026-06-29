import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-800">All Doctors</h1>
        <p className="text-sm text-slate-500 mt-1">
          View, manage, and toggle the availability of all registered medical staff.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col"
          >
            {/* Doctor Image Container */}
            <div className="bg-slate-50 relative overflow-hidden aspect-[4/3] flex items-center justify-center border-b border-slate-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Dynamic Availability Badge Overlay */}
              <span
                className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
                  item.available
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-500 text-white"
                }`}
              >
                {item.available ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-grow justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md w-fit mt-1.5">
                  {item.speciality}
                </p>
              </div>

              {/* Availability Custom Toggle UX */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                <span className="text-xs font-medium text-slate-500">Available for Appt.</span>
                
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={() => changeAvailability(item._id)}
                    className="sr-only peer"
                  />
                  {/* Track */}
                  <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;