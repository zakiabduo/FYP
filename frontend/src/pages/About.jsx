import React from "react";
import { Stethoscope, CalendarCheck, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <section className="w-full py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center">
      <div className="w-full text-center">
        
        {/* Modern Typography Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight">
            About <span className="text-indigo-600">Doclo</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            Doclo is a smart doctor appointment management system that seamlessly bridges the gap between verified healthcare professionals and patients globally.
          </p>
        </div>

        {/* Feature Grid Configuration Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-4">
          
          {/* Expert Doctors Card */}
          <div className="group p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50/10 transition-all duration-300 flex flex-col items-center cursor-pointer">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-100/70 transition-colors duration-300 mb-5">
              <Stethoscope className="w-8 h-8 stroke-[2]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
              Expert Doctors
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm text-center leading-relaxed font-medium">
              Access top-rated, certified, and heavily verified medical professionals across multiple clinical specialties.
            </p>
          </div>

          {/* Easy Appointments Card */}
          <div className="group p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50/10 transition-all duration-300 flex flex-col items-center cursor-pointer">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-100/70 transition-colors duration-300 mb-5">
              <CalendarCheck className="w-8 h-8 stroke-[2]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
              Easy Appointments
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm text-center leading-relaxed font-medium">
              Book, reschedule, or cancel consultation slots at your immediate convenience from any screen, anytime.
            </p>
          </div>

          {/* Secure Platform Card */}
          <div className="group p-6 sm:p-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50/10 transition-all duration-300 flex flex-col items-center cursor-pointer">
            <div className="p-4 bg-sky-50 text-sky-600 rounded-2xl group-hover:bg-sky-100/70 transition-colors duration-300 mb-5">
              <ShieldCheck className="w-8 h-8 stroke-[2]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">
              Secure Platform
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm text-center leading-relaxed font-medium">
              Your sensitive healthcare profiles and active conversation histories are tightly protected with secure encryptions.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;