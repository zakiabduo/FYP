import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Welcome Doctor Header */}
        <div className="mb-8 border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-slate-800">Doctor Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back! Here is an overview of your medical sessions, patients, and revenue metrics.
          </p>
        </div>

        {/* Dashboard Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Earnings Metric Card */}
          <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex flex-col gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                {currency}{dashData.earnings}
              </span>
              <p className="text-sm font-medium text-slate-500">Total Earnings</p>
            </div>
            <div className="p-3.5 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Appointments Metric Card */}
          <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex flex-col gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                {dashData.appointments}
              </span>
              <p className="text-sm font-medium text-slate-500">Total Appointments</p>
            </div>
            <div className="p-3.5 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Patients Metric Card */}
          <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group">
            <div className="flex flex-col gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                {dashData.patients}
              </span>
              <p className="text-sm font-medium text-slate-500">Unique Patients</p>
            </div>
            <div className="p-3.5 bg-sky-50 rounded-xl group-hover:bg-sky-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>

        </div>

        {/* Latest Bookings Container */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          
          {/* Section List Title Header */}
          <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4 bg-slate-50/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h2 className="font-bold text-slate-800 text-base">
              Latest Bookings
            </h2>
          </div>

          {/* Core Mapping Content Feed Container */}
          <div className="divide-y divide-slate-100 max-h-[440px] overflow-y-auto">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-5 py-4 hover:bg-slate-50/60 transition-colors"
              >
                {/* Patient Information profiling */}
                <div className="flex items-center gap-3.5">
                  <img
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100 shadow-sm"
                    src={item.userData.image}
                    alt={item.userData.name}
                  />

                  <div>
                    <p className="font-semibold text-slate-800 text-sm">
                      {item.userData.name}
                    </p>
                    <p className="text-xs font-medium text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                </div>

                {/* Status Badges or Conditional Control Operations */}
                <div className="text-right">
                  {item.cancelled ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                      Completed
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      
                      {/* Cancel Action Button (Cross Icon) */}
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all cursor-pointer group"
                        title="Cancel Appointment"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Complete Action Button (Tick Icon) */}
                      <button
                        onClick={() => completeAppointment(item._id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-all cursor-pointer group"
                        title="Mark as Completed"
                      >
                        <svg xmlns="http://www.w3.org/2000/xl" className="h-4 w-4 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>

                    </div>
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

export default DoctorDashboard;