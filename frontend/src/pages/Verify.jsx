import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const appointmentId = searchParams.get("appointmentId");

  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      if (!token) return;

      const { data } = await axios.post(
        backendUrl + "/api/user/verify-stripe",
        { success, appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/my-appointment");
      } else {
        toast.error(data.message);
        navigate("/my-appointment");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      navigate("/my-appointment"); // Safe routing fallback if server drops error
    }
  };

  useEffect(() => {
    if (token) {
      verifyPayment();
    }
  }, [token]);

  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-slate-50/50 px-4">
      <div className="max-w-sm w-full bg-white border border-slate-200 shadow-xl rounded-2xl p-8 flex flex-col items-center text-center gap-5 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Modern Nested Loader Ring */}
        <div className="relative flex items-center justify-center w-16 h-16 select-none mb-2">
          <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Status Copy Text */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-slate-800 font-extrabold text-lg tracking-tight">Verifying Secure Payment</h3>
          <p className="text-slate-400 text-xs font-semibold leading-relaxed max-w-[240px] mx-auto">
            Please wait while we cross-check your stripe receipt tokens with banking channels. Do not refresh.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Verify;