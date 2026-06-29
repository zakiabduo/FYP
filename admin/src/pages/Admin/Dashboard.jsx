import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Welcome Dashboard Header */}
        <div className="mb-8 border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time control center for system analytics, users, and booking statuses.
          </p>
        </div>

        {/* Analytics Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Doctors Card */}
          <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex flex-col gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                {dashData.doctors}
              </span>
              <p className="text-sm font-medium text-slate-500">Total Doctors</p>
            </div>
            <div className="p-3.5 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex flex-col gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                {dashData.appointments}
              </span>
              <p className="text-sm font-medium text-slate-500">Appointments Booked</p>
            </div>
            <div className="p-3.5 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Patients Card */}
          <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex flex-col gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                {dashData.patients}
              </span>
              <p className="text-sm font-medium text-slate-500">Registered Patients</p>
            </div>
            <div className="p-3.5 bg-sky-50 rounded-xl group-hover:bg-sky-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>

        </div>

        {/* Latest Bookings Card Section */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4 bg-slate-50/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <h2 className="font-bold text-slate-800 text-base">
              Latest Bookings
            </h2>
          </div>

          {/* Appointment Reactive Scroll Area */}
          <div className="divide-y divide-slate-100 max-h-[440px] overflow-y-auto">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/60 transition-colors"
              >
                {/* Doctor Group Profiler */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 shadow-sm"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">
                      {item.docData.name}
                    </p>
                    <p className="text-xs font-medium text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                </div>

                {/* Quick Conditional Actions */}
                <div>
                  {item.cancelled ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-red-50 text-red-600 border border-red-100">
                      Cancelled
                    </span>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer group"
                      title="Cancel Booking"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transform group-hover:scale-105 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    )
  );
};

export default Dashboard;