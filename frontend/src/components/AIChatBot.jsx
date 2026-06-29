import React, { useState } from "react";
import axios from "axios";

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I am Doclo's AI Medical Assistant. How can I help you regarding your health today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/ai-chat`, { message: input });
      
      // ✅ BUG FIXED: Removed the stray semicolon after 'else'
      if (data.success) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
      } else {
        // Backend se aane wala exact error dikhayenge
        setMessages((prev) => [...prev, { sender: "ai", text: data.message || "Sorry, I am facing an issue connecting to the server." }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "ai", text: "Network error. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-primary-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-transform hover:scale-110"
        >
          🤖
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 bg-white border border-gray-300 shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[26rem]">
          {/* Header */}
          <div className="bg-primary text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <p className="font-semibold">Doclo AI Assistant</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-300 font-bold text-lg">
              ✕
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-2 rounded-2xl max-w-[85%] text-sm shadow-sm ${msg.sender === "user" ? "bg-primary text-white rounded-br-none" : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-2xl bg-white border border-gray-200 text-gray-500 text-sm italic">
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about symptoms..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none focus:border-primary text-sm"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary-600 transition disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatBot;