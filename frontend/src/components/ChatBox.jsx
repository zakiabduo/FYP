import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

// Global singleton socket instance connection
const socket = io(import.meta.env.VITE_BACKEND_URL);

const ChatBox = ({ appointmentId, senderId, receiverId, onClose }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messagesEndRef = useRef(null);

  // Auto Scroll to Bottom function helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // 1. Join room safely first
    socket.emit("join_room", appointmentId);

    // 2. Request chat history from socket channel right after joining room
    socket.emit("get_history", appointmentId);

    // 3. Listen for historical data chunk loaded from backend DB
    socket.on("chat_history", (historyMessages) => {
      // Map database schema format into visual state requirements cleanly
      const formattedHistory = historyMessages.map(msg => ({
        room: msg.appointmentId,
        senderId: msg.senderId,
        receiverId: msg.receiverId,
        text: msg.text,
        time: new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      }));
      setMessageList(formattedHistory);
    });

    // 4. Setup incoming message listener
    const handleIncomingMessage = (data) => {
      if (data.room === appointmentId) {
        setMessageList((list) => [...list, data]);
      }
    };

    socket.on("receive_message", handleIncomingMessage);

    // Clean listeners on component unmounting blocks to avoid duplication
    return () => {
      socket.off("chat_history");
      socket.off("receive_message", handleIncomingMessage);
    };
  }, [appointmentId]);

  // Handle auto scrolling alignment on messaging increments
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    
    if (currentMessage.trim() !== "") {
      const now = new Date();
      const messageData = {
        room: appointmentId,
        senderId: senderId,
        receiverId: receiverId,
        text: currentMessage.trim(),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        date: now.getTime() // Standard Timestamp to safely evaluate into mongoose Number type schema
      };

      // Emit straight to websocket server pipeline instantly
      socket.emit("send_message", messageData);
      
      // Update local state queue for rendering and clear input fields synchronously
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  return (
    <div className="w-full h-[450px] bg-white rounded-2xl flex flex-col shadow-inner overflow-hidden border border-slate-100">
      
      {/* Header Panel */}
      <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800 select-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <p className="font-semibold text-xs text-slate-200 uppercase tracking-wider">Live Consultation Room</p>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all cursor-pointer font-bold"
            title="Minimize Chat"
          >
            ✕
          </button>
        )}
      </div>

      {/* Main Chat Core Body Frame */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 flex flex-col gap-3 min-h-0">
        {messageList.length === 0 ? (
          <div className="m-auto flex flex-col items-center text-center p-4 select-none">
            <p className="text-xs text-slate-400 font-medium">No conversion logs yet.<br/>Type below to begin chatting.</p>
          </div>
        ) : (
          messageList.map((msg, index) => {
            const isMe = msg.senderId === senderId;
            return (
              <div 
                key={index} 
                className={`flex w-full animate-in fade-in-50 duration-200 ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`px-3.5 py-2 rounded-2xl max-w-[85%] shadow-sm text-sm flex flex-col gap-0.5 ${
                    isMe 
                      ? "bg-indigo-600 text-white rounded-br-sm" 
                      : "bg-white text-slate-800 border border-slate-200/60 rounded-bl-sm"
                  }`}
                >
                  <p className="break-words leading-relaxed font-medium">{msg.text}</p>
                  <span className={`text-[9px] font-medium text-right select-none block tracking-tighter ${isMe ? "text-indigo-200" : "text-slate-400"}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer Submission Controls Section */}
      <form onSubmit={sendMessage} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Write secure message details..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
        />
        <button 
          type="submit" 
          disabled={!currentMessage.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white p-2.5 rounded-xl font-bold text-xs transition-all shadow-md shadow-indigo-600/10 active:scale-95 cursor-pointer"
        >
          Send
        </button>
      </form>

    </div>
  );
};

export default ChatBox;