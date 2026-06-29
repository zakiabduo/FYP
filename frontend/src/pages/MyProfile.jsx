import React, { useState, useContext } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);

      if (image) formData.append('image', image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: { token }
        }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData && (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 min-h-[85vh]">
      
      {/* Header Panel Metadata */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your secure identities, clinical notification parameters and verification credentials logs.</p>
      </div>

      {/* Main Container Card Box Base */}
      <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col items-center md:items-start md:flex-row gap-8">
        
        {/* Left Section: Dynamic Avatar Profile Photo Segment */}
        <div className="shrink-0 flex flex-col items-center justify-center select-none">
          {isEdit ? (
            <label htmlFor="image" className="relative group cursor-pointer inline-block rounded-full overflow-hidden p-1 bg-slate-50 border border-slate-200/60 shadow-sm">
              <img 
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" 
                src={image ? URL.createObjectURL(image) : userData.image} 
                alt="Profile Workspace" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img className="w-8 h-8 opacity-70 group-hover:scale-110 transition-transform duration-200" src={assets.upload_icon} alt="Upload Badge" />
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
          ) : (
            <div className="p-1 bg-slate-50 border border-slate-200 rounded-full shadow-sm">
              <img
                src={userData.image}
                alt={userData.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Right Section: Core Form Matrix Fields Stack */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* Patient Top Display Name Info */}
          <div className="text-center md:text-left">
            {isEdit ? (
              <div className="flex flex-col gap-1 w-full max-w-sm mx-auto md:mx-0">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider pl-0.5">Full Name</span>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-slate-50/30 focus:bg-white"
                  placeholder="Enter full name"
                />
              </div>
            ) : (
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">{userData.name}</h2>
            )}
            {!isEdit && (
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mt-1.5 bg-indigo-50 px-2.5 py-0.5 rounded-md w-fit mx-auto md:mx-0">
                Patient Account
              </p>
            )}
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* Contact Group Information Matrix */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Contact Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm font-medium text-slate-700">
              
              <div className="flex flex-col gap-1.5">
                <span className="text-slate-400 font-semibold text-xs pl-0.5">Email Address</span>
                <p className="text-slate-800 bg-slate-50 border border-slate-100/80 px-4 py-2.5 rounded-xl break-all select-all font-medium">
                  {userData.email}
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-slate-400 font-semibold text-xs pl-0.5">Phone Touchpoint</span>
                {isEdit ? (
                  <input
                    type="text"
                    value={userData.phone}
                    onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-slate-50/50 focus:bg-white"
                    placeholder="Provide mobile contact"
                  />
                ) : (
                  <p className="text-slate-800 border border-transparent px-1 py-2 font-medium">{userData.phone || "Not configured"}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-slate-400 font-semibold text-xs pl-0.5">Residence Location</span>
                {isEdit ? (
                  <div className="flex flex-col gap-2 w-full max-w-xl">
                    <input
                      type="text"
                      onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                      value={userData.address?.line1 || ""}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-slate-50/50 focus:bg-white"
                      placeholder="Address line 1"
                    />
                    <input
                      type="text"
                      onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                      value={userData.address?.line2 || ""}
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-slate-50/50 focus:bg-white"
                      placeholder="Address line 2"
                    />
                  </div>
                ) : (
                  <div className="text-slate-800 border border-transparent px-1 py-1.5 leading-relaxed font-medium">
                    <p>{userData.address?.line1 || "Street configuration incomplete"}</p>
                    {userData.address?.line2 && <p className="text-slate-400 text-xs font-medium mt-0.5">{userData.address?.line2}</p>}
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* Basic Information Demographics Block */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Basic Demographics</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm font-medium text-slate-700">
              
              <div className="flex flex-col gap-1.5">
                <span className="text-slate-400 font-semibold text-xs pl-0.5">Gender</span>
                {isEdit ? (
                  <select
                    onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                    value={userData.gender}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-white shadow-sm font-semibold cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className="text-slate-800 border border-transparent px-1 py-2 font-medium">{userData.gender}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-slate-400 font-semibold text-xs pl-0.5">Date of Birth</span>
                {isEdit ? (
                  <input
                    type="date"
                    value={userData.dob || ""}
                    onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-white shadow-sm font-medium"
                  />
                ) : (
                  <p className="text-slate-800 border border-transparent px-1 py-2 font-medium">
                    {userData.dob ? new Date(userData.dob).toLocaleDateString([], { day: '2-digit', month: 'long', year: 'numeric' }) : "Not configured"}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* Form Action Triggers Controls Bar */}
          <div className="pt-4 flex justify-end border-t border-slate-100 mt-2">
            {isEdit ? (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => { setIsEdit(false); setImage(false); }}
                  className="w-1/2 sm:w-auto px-5 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer text-center select-none"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={updateUserProfileData}
                  className="w-1/2 sm:w-auto px-6 py-2.5 text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-600/10 active:scale-[0.98] cursor-pointer text-center select-none"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 select-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11 20H8v-3L19.586 4.586z" />
                </svg>
                Modify Info
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;