import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-800">All Appointments</h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor all upcoming, completed, and cancelled patient-doctor slots.
        </p>
      </div>

      {/* Main Table Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="max-h-[70vh] min-h-[50vh] overflow-y-auto overflow-x-auto">
          
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[0.5fr_2.5fr_1fr_2fr_2.5fr_1fr_1.5fr] py-4 px-6 border-b border-slate-200 font-semibold text-slate-700 bg-slate-50 sticky top-0 z-10 text-xs uppercase tracking-wider">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fee</p>
            <p className="text-right">Actions</p>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-100">
            {appointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 md:gap-0 md:grid md:grid-cols-[0.5fr_2.5fr_1fr_2fr_2.5fr_1fr_1.5fr] items-start md:items-center text-slate-600 py-4 px-6 hover:bg-slate-50/70 transition-colors text-sm"
              >
                {/* ID - Hidden on mobile */}
                <p className="hidden md:block text-slate-400 font-medium">{index + 1}</p>

                {/* Patient Profile */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <img
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 shadow-sm"
                    src={item.userData.image}
                    alt={item.userData.name}
                  />
                  <div>
                    <p className="font-semibold text-slate-800 md:font-normal">{item.userData.name}</p>
                    <span className="md:hidden text-xs text-slate-400">Age: {calculateAge(item.userData.dob)}</span>
                  </div>
                </div>

                {/* Age - Hidden on mobile */}
                <p className="hidden md:block text-slate-600">{calculateAge(item.userData.dob)} Yrs</p>

                {/* Date & Time */}
                <div className="text-slate-600 md:text-left flex flex-row md:flex-col gap-2 md:gap-0 items-center md:items-start text-xs md:text-sm">
                  <span className="font-medium text-slate-800 md:text-slate-600">{slotDateFormat(item.slotDate)}</span>
                  <span className="text-indigo-600 md:text-slate-400 font-medium md:font-normal md:text-xs bg-indigo-50 md:bg-transparent px-2 py-0.5 md:p-0 rounded">
                    {item.slotTime}
                  </span>
                </div>

                {/* Doctor Profile */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 shadow-sm"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                  <div>
                    <p className="font-medium text-slate-800 md:text-slate-600">{item.docData.name}</p>
                    <p className="text-xs text-indigo-600 md:hidden">{item.docData.speciality}</p>
                  </div>
                </div>

                {/* Fees */}
                <p className="font-semibold text-slate-800 md:font-normal">
                  <span className="md:hidden text-xs text-slate-400 font-normal">Fee: </span>
                  {currency}{item.amount}
                </p>

                {/* Action Control Trigger */}
                <div className="w-full md:w-auto flex justify-end items-center md:text-right pt-2 md:pt-0 border-t border-slate-100 md:border-none">
                  {item.cancelled ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                      Cancelled
                    </span>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors group cursor-pointer"
                      title="Cancel Appointment"
                    >
                      {/* Modern SVG Cross Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 transform group-hover:scale-110 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AllAppointments;