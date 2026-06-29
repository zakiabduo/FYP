import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../../../frontend/src/assets/assets_frontend/assets";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-[60vh] w-full">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-500">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      
      {/* Header Container */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
        <p className="text-sm text-slate-500 mt-1">View, manage and update your practice information details.</p>
      </div>

      {/* Profile Card Workspace Frame */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Doctor Image Panel Layout */}
          <div className="w-full md:w-auto flex justify-center shrink-0">
            <div className="relative group p-1 bg-slate-50 border border-slate-100 rounded-2xl">
              <img
                src={profileData?.image}
                alt="doctor"
                className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-xl shadow-inner"
              />
            </div>
          </div>

          {/* Core Descriptive Text Metadata Block */}
          <div className="flex-1 w-full flex flex-col gap-5">
            
            {/* Identity Line */}
            <div>
              <h2 className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                {profileData?.name}
                <img
                  src={assets.verified_icon}
                  alt="verified status"
                  className="w-5 h-5 object-contain select-none"
                />
              </h2>
              
              <div className="flex flex-wrap items-center gap-2.5 mt-2">
                <p className="text-slate-500 font-medium text-sm sm:text-base">
                  {profileData?.degree} — <span className="text-indigo-600 font-semibold">{profileData?.speciality}</span>
                </p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {profileData?.experience} Experience
                </span>
              </div>
            </div>

            {/* Professional Bio Statement */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100/80">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">About Professional Bio</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {profileData?.about}
              </p>
            </div>

            {/* Interactive Form Fields Stack Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              
              {/* Fee Pricing Row Element */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Appointment Fee</label>
                {isEdit ? (
                  <div className="relative flex items-center max-w-[200px]">
                    <span className="absolute left-3 text-sm font-semibold text-slate-500">{currency}</span>
                    <input
                      type="number"
                      className="w-full pl-8 pr-3 py-2 text-sm font-medium text-slate-800 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-white shadow-sm"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                      value={profileData.fees}
                    />
                  </div>
                ) : (
                  <p className="text-base font-bold text-slate-800 flex items-center gap-1">
                    <span className="text-indigo-600 font-semibold">{currency}</span>
                    {profileData?.fees}
                  </p>
                )}
              </div>

              {/* Address Rows Processing Element */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practice Address Location</label>
                {isEdit ? (
                  <div className="flex flex-col gap-2 w-full max-w-sm">
                    <input
                      type="text"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-white shadow-sm"
                      placeholder="Address line 1"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      value={profileData.address?.line1 || ""}
                    />
                    <input
                      type="text"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-white shadow-sm"
                      placeholder="Address line 2"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      value={profileData.address?.line2 || ""}
                    />
                  </div>
                ) : (
                  <div className="text-sm font-medium text-slate-700 flex flex-col gap-0.5">
                    <p>{profileData?.address?.line1 || "No Address Line 1 Provided"}</p>
                    <p className="text-slate-400 text-xs">{profileData?.address?.line2}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Availability Slider Action Section Switch */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100 mt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Availability Status</span>
              <label className={`relative inline-flex items-center ${isEdit ? 'cursor-pointer' : 'opacity-70 cursor-not-allowed'} select-none`}>
                <input
                  type="checkbox"
                  checked={profileData.available}
                  disabled={!isEdit}
                  onChange={() =>
                    isEdit &&
                    setProfileData((prev) => ({
                      ...prev,
                      available: !prev.available,
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-slate-200 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                <span className="ml-2.5 text-sm font-semibold text-slate-700">
                  {profileData.available ? "Active Intake" : "On Leave"}
                </span>
              </label>
            </div>

            {/* Primary Action Button Bar Workspace Controllers */}
            <div className="pt-4 flex justify-end">
              {isEdit ? (
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setIsEdit(false)}
                    className="w-1/2 sm:w-auto px-5 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateProfile}
                    className="w-1/2 sm:w-auto px-6 py-2.5 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-600/10 active:scale-[0.98] cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11 20H8v-3L19.586 4.586z" />
                  </svg>
                  Modify Profile
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;