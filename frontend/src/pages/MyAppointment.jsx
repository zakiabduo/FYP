import React, { useContext, useEffect, useState, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import ChatBox from "../components/ChatBox";
import io from "socket.io-client";

// Global singleton socket connection instance
const socket = io(import.meta.env.VITE_BACKEND_URL);

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [activeChat, setActiveChat] = useState(null); 
  const [unread, setUnread] = useState({});

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments([...data.appointments].reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Memoize selected chat data payload item properties for safe side-screen rendering layouts
  const activeChatData = useMemo(() => {
    return appointments.find((app) => app._id === activeChat);
  }, [activeChat, appointments]);

  useEffect(() => {
    if (appointments.length > 0) {
      appointments.forEach((app) => {
        socket.emit("join_room", app._id);
      });
    }
  }, [appointments]);

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

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } });
      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
      
      {/* Structural Header Section Title */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-800">My Consultations</h1>
        <p className="text-sm text-slate-500 mt-1">Track history logs, clear outstanding stripe bills, and contact clinic desks via live messaging tools.</p>
      </div>

      {/* Dynamic Dashboard View Split Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Section: Active Bookings Queue Wrapper */}
        <div className={`w-full transition-all duration-300 ${activeChat ? "lg:w-7/12 xl:w-8/12" : "w-full"}`}>
          <div className="flex flex-col gap-4">
            {appointments.length === 0 ? (
              <div className="text-center p-12 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-400 font-medium">
                No appointment bookings found in your history log file.
              </div>
            ) : (
              appointments.map((item, index) => (
                <div 
                  key={item._id || index} 
                  className={`bg-white border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between transition-all duration-200 ${
                    activeChat === item._id 
                      ? "border-indigo-500 shadow-md ring-4 ring-indigo-500/5 bg-indigo-50/10" 
                      : "border-slate-200/80 shadow-sm hover:shadow-md"
                  }`}
                >
                  {/* Doctor Profile Metadata Segment info */}
                  <div className="flex items-center gap-4 flex-1">
                    <img 
                      src={item.docData.image} 
                      alt={item.docData.name} 
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-slate-100 bg-slate-50 shrink-0 shadow-inner" 
                    />
                    <div className="flex flex-col gap-1 overflow-hidden">
                      <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-tight truncate">
                        {item.docData.name}
                      </h3>
                      <p className="text-xs font-semibold text-indigo-600 bg-indigo-50/60 border border-indigo-100/30 px-2 py-0.5 rounded-md w-fit">
                        {item.docData.speciality}
                      </p>
                      <p className="text-xs font-medium text-slate-500 mt-1.5 flex items-center gap-1.5 flex-wrap">
                        <span className="text-slate-700 font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200/30">
                          {slotDateFormat(item.slotDate)}
                        </span>
                        <span className="text-slate-400 font-bold">@</span>
                        <span className="text-slate-600 font-semibold">{item.slotTime}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions Processing Controller Row Panel */}
                  <div className="w-full sm:w-auto flex flex-row sm:flex-col gap-2.5 justify-end shrink-0 pt-3 sm:pt-0 border-t border-slate-100 sm:border-none">
                    
                    {/* Live Support consultation channel trigger elements */}
                    {!item.cancelled && !item.isCompleted && (
                      <button 
                        onClick={() => openChat(item._id)} 
                        className={`relative inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl shadow-sm border transition-all cursor-pointer ${
                          activeChat === item._id 
                            ? "bg-indigo-600 text-white border-indigo-600" 
                            : "bg-indigo-50 text-indigo-600 border-indigo-100/70 hover:bg-indigo-100"
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Chat Room
                        
                        {/* Red Dot active live messages count ping loop indicator markup */}
                        {unread[item._id] && (
                          <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 border border-white"></span>
                          </span>
                        )}
                      </button>
                    )}

                    {/* Financial Stripe checkout trigger elements bindings */}
                    {!item.cancelled && !item.payment && !item.isCompleted && (
                      <button 
                        onClick={() => appointmentStripe(item._id)} 
                        className="inline-flex items-center justify-center gap-1 px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm shadow-emerald-600/10 active:scale-[0.98] transition-all cursor-pointer"
                      >
                        Pay Online
                      </button>
                    )}
                    
                    {/* Cancellation pipeline workflows handlers */}
                    {!item.cancelled && !item.isCompleted && (
                      <button 
                        onClick={() => cancelAppointment(item._id)} 
                        className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold border border-slate-200 bg-white text-rose-600 hover:bg-rose-50/50 hover:border-rose-200 rounded-xl transition-all cursor-pointer"
                      >
                        Cancel Slot
                      </button>
                    )}

                    {/* Status Badges Fallback Labels elements placeholders */}
                    {item.cancelled && (
                      <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-xl text-xs font-bold bg-red-50 text-red-600 border border-red-100 max-w-fit sm:ml-auto">
                        Cancelled
                      </span>
                    )}

                    {item.isCompleted && (
                      <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 max-w-fit sm:ml-auto">
                        Completed
                      </span>
                    )}

                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Section: Connected Patient Live Consultation ChatBox Panel */}
        {activeChat && activeChatData && (
          <div className="w-full lg:w-5/12 xl:w-4/12 bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden sticky top-[90px] animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <h3 className="font-bold text-slate-800 text-sm">
                  Dr. {activeChatData.docData.name}
                </h3>
              </div>
              <button 
                onClick={() => setActiveChat(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors cursor-pointer"
                title="Close Chat Panel"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-2">
              <ChatBox 
                appointmentId={activeChat} 
                senderId={activeChatData.userId} 
                receiverId={activeChatData.docId} 
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

export default MyAppointment;