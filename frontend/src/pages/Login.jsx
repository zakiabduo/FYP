import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("SignUp"); // 'SignUp' or 'LogIn'
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let response;

      // SIGNUP PIPELINE
      if (state === "SignUp") {
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
      } 
      // LOGIN PIPELINE
      else {
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
      }

      const { data } = response;

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(state === "SignUp" ? "Account created successfully!" : "Welcome back!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-xl rounded-2xl p-6 sm:p-10 transition-all duration-300">
        
        {/* Modern Segmented Interface Toggle Switcher Tab */}
        <div className="p-1 bg-slate-100 rounded-xl flex items-center justify-between mb-8 select-none">
          <button
            type="button"
            onClick={() => setState("SignUp")}
            className={`w-1/2 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
              state === "SignUp"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => setState("LogIn")}
            className={`w-1/2 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
              state === "LogIn"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Patient Sign In
          </button>
        </div>

        {/* Section Typography Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            {state === "SignUp" ? "Get Started" : "Welcome Back"}
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            {state === "SignUp" 
              ? "Please register your secure credentials to join us." 
              : "Enter your authenticated password to access your portal."
            }
          </p>
        </div>

        {/* Core Submission Form */}
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
          
          {/* Conditional Name Field Input */}
          {state === "SignUp" && (
            <div className="flex flex-col gap-1.5 animate-in fade-in duration-200">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-0.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-slate-50/50 focus:bg-white font-medium"
              />
            </div>
          )}

          {/* Email Input Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-0.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              onChange={(e) => setMail(e.target.value)}
              value={email}
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-slate-50/50 focus:bg-white font-medium"
            />
          </div>

          {/* Password Input Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-0.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-slate-50/50 focus:bg-white font-medium"
            />
          </div>

          {/* Core Action CTA Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-md shadow-indigo-600/10 active:scale-[0.99] mt-2 cursor-pointer flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            {state === "SignUp" ? "Authorize & Register" : "Secure Log In"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;