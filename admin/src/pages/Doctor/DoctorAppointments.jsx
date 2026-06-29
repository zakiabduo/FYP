import React, { useContext, useEffect, useState, useMemo } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import ChatBox from "../../../../frontend/src/components/ChatBox";
import io from "socket.io-client";

// Global socket connection instance
const socket = io(import.meta.env.VITE_BACKEND_URL);

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  
  const [activeChat, setActiveChat] = useState(null); 
  const [unread, setUnread] = useState({});

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  // 100% Foolproof Sorting using MongoDB ID comparison or Fallback Timestamps
  const sortedAppointments = useMemo(() => {
    return [...appointments].sort((a, b) => {
      // Rule 1: Agar backend se unique ID ya creation date hai toh strict string localized comparison
      if (b._id && a._id) {
        return b._id.localeCompare(a._id); // Higher/Newer MongoDB Hex ID always comes first
      }
      
      // Fallback Rule 2: Standard Date parsing fallback if IDs aren't sequential strings
      const dateTimeA = new Date(`${a.slotDate} ${a.slotTime || '00:00'}`).getTime();
      const dateTimeB = new Date(`${b.slotDate} ${b.slotTime || '00:00'}`).getTime();
      return dateTimeB - dateTimeA;
    });
  }, [appointments]);

  // Active chat metadata lookup for side layout window frame injection
  const activeChatData = useMemo(() => {
    return appointments.find((app) => app._id === activeChat);
  }, [activeChat, appointments]);

  // Socket rooms join flow
  useEffect(() => {
    if (appointments.length > 0) {
      appointments.forEach((app) => socket.emit("join_room", app._id));
    }
  }, [appointments]);

  // Unread notification listener
  useEffect(() => {
    const handleNotification = (data) => {
      if (activeChat !== data.room) {
        setUnread((prev) => ({ ...prev, [data.room]: true }));
      }
    };
    socket.on("receive_message", handleNotification);
    return () => socket.off("receive_message", handleNotification);
  }, [activeChat]);

  const openChat = (id) => {
    setActiveChat(id);
    setUnread((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Structural Header Title */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-800">Appointment Sessions</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review date-sorted logs, manage statuses, and consult patients via live chat dashboard panels.
        </p>
      </div>

      {/* Dynamic Master Layout: Splits horizontally into 2 columns when chat is active */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Column: Data Grid Table */}
        <div className={`w-full transition-all duration-300 ${activeChat ? "lg:w-7/12 xl:w-8/12" : "w-full"}`}>
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="max-h-[70vh] min-h-[50vh] overflow-y-auto overflow-x-auto">
              
              {/* Table Row Header Configuration */}
              <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2.5fr_1fr_2fr] py-4 px-6 border-b border-slate-200 font-semibold text-slate-700 bg-slate-50 sticky top-0 z-10 text-xs uppercase tracking-wider">
                <p>#</p>
                <p>Patient</p>
                <p>Payment</p>
                <p>Age</p>
                <p>Date & Time</p>
                <p>Fee</p>
                <p className="text-right">Actions</p>
              </div>

              {/* Mapped Records list body */}
              <div className="divide-y divide-slate-100">
                {sortedAppointments.map((item, index) => (
                  <div 
                    key={item._id || index} 
                    className={`flex flex-col md:grid md:grid-cols-[0.5fr_2fr_1fr_1fr_2.5fr_1fr_2fr] items-start md:items-center text-slate-600 py-4 px-6 hover:bg-slate-50/60 transition-colors text-sm ${
                      activeChat === item._id ? "bg-indigo-50/40 hover:bg-indigo-50/50" : ""
                    }`}
                  >
                    <p className="hidden md:block text-slate-400 font-medium">{index + 1}</p>

                    {/* Patient identity container profile layout */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <img src={item.userData.image} alt={item.userData.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 shadow-sm" />
                      <p className="font-semibold text-slate-800 md:font-normal">{item.userData.name}</p>
                    </div>

                    {/* Payment Gate status pill template */}
                    <p className="md:block">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${item.payment ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {item.payment ? "Online" : "Cash"}
                      </span>
                    </p>

                    <p className="hidden md:block">{calculateAge(item.userData.dob)} Yrs</p>

                    <div className="text-xs md:text-sm flex flex-row md:flex-col gap-2 md:gap-0 mt-1 md:mt-0">
                      <span className="font-medium text-slate-800 md:text-slate-600">{slotDateFormat(item.slotDate)}</span>
                      <span className="text-indigo-600 md:text-slate-400 font-medium md:font-normal md:text-xs bg-indigo-50 md:bg-transparent px-2 py-0.5 md:p-0 rounded">
                        {item.slotTime}
                      </span>
                    </div>

                    <p className="font-semibold text-slate-800 md:font-normal">{currency}{item.amount}</p>

                    {/* Core Responsive Controller Actions Group */}
                    <div className="w-full md:w-auto flex items-center justify-end gap-2.5 pt-3 md:pt-0 border-t border-slate-100 md:border-none mt-2 md:mt-0">
                      
                      {/* Interactive Live Chat Access Point button triggers */}
                      {!item.cancelled && (
                        <button 
                          onClick={() => openChat(item._id)} 
                          className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer shadow-sm border ${
                            activeChat === item._id 
                              ? "bg-indigo-600 text-white border-indigo-600" 
                              : "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100"
                          }`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          Chat
                          
                          {/* Live Pulse Unread Red Dot notification bubble badge markup */}
                          {unread[item._id] && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 border border-white"></span>
                            </span>
                          )}
                        </button>
                      )}

                      {/* Management state actions triggers */}
                      {item.cancelled ? (
                        <span className="px-2.5 py-1 text-xs font-medium bg-red-50 text-red-600 border border-red-100 rounded-md">Cancelled</span>
                      ) : item.isCompleted ? (
                        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-md">Completed</span>
                      ) : (
                        <div className="flex items-center gap-1">
                          {/* Cancel cross actions */}
                          <button
                            onClick={() => cancelAppointment(item._id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Cancel Session"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          
                          {/* Complete verification tick actions */}
                          <button
                            onClick={() => completeAppointment(item._id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                            title="Complete Session"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
        </div>

        {/* Right Column: Live Side-by-Side ChatBox Window Panel */}
        {activeChat && activeChatData && (
          <div className="w-full lg:w-5/12 xl:w-4/12 bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden sticky top-[90px] animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <h3 className="font-bold text-slate-800 text-sm">
                  Consultation: {activeChatData.userData.name}
                </h3>
              </div>
              <button 
                onClick={() => setActiveChat(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-2">
              <ChatBox 
                appointmentId={activeChat} 
                senderId={activeChatData.docId} 
                receiverId={activeChatData.userId} 
                socket={socket} 
                onClose={() => setActiveChat(null)} 
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DoctorAppointments;