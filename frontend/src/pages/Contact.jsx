import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center">
      <div className="w-full text-center">
        
        {/* Modern Header Typography */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight">
            Contact <span className="text-indigo-600">Doclo</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed font-medium">
            Have questions, feedback, or need help booking your appointment? Get in touch with our support team we’re always happy to assist you.
          </p>
        </div>

        {/* Contact Info Grid Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          
          {/* Email Card */}
          <div className="group p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50/10 transition-all duration-300 flex flex-col items-center cursor-pointer">
            <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-100/70 transition-colors duration-300 mb-4">
              <Mail className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">Email Support</h3>
            <p className="text-slate-400 text-sm font-medium">support@doclo.com</p>
          </div>

          {/* Phone Card */}
          <div className="group p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50/10 transition-all duration-300 flex flex-col items-center cursor-pointer">
            <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-100/70 transition-colors duration-300 mb-4">
              <Phone className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">Call Center</h3>
            <p className="text-slate-400 text-sm font-medium">+92 300 1234567</p>
          </div>

          {/* Location Card */}
          <div className="group p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50/10 transition-all duration-300 flex flex-col items-center cursor-pointer">
            <div className="p-3.5 bg-sky-50 text-sky-600 rounded-xl group-hover:bg-sky-100/70 transition-colors duration-300 mb-4">
              <MapPin className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1 group-hover:text-sky-600 transition-colors">Main Location</h3>
            <p className="text-slate-400 text-sm font-medium">Lahore, Pakistan</p>
          </div>

        </div>

        {/* Polished Web3Forms Contact Form Form */}
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 text-left shadow-sm hover:shadow-md transition-all duration-300"
        >
          {/* Web3Forms access key */}
          <input
            type="hidden"
            name="access_key"
            value="a70260d5-0ab0-4183-b26e-135ac83bdec1"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-slate-50/50 focus:bg-white font-medium"
                required
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@hospital.com"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-slate-50/50 focus:bg-white font-medium"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">Detailed Message</label>
            <textarea
              name="message"
              placeholder="Write your concern details here..."
              rows="5"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-slate-50/50 focus:bg-white font-medium resize-none leading-relaxed"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md shadow-indigo-600/10 active:scale-[0.99] cursor-pointer text-sm flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9-2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send Secure Message
          </button>
        </form>
        
      </div>
    </section>
  );
};

export default Contact;