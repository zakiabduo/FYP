import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("Dermatologist");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({
          line1: address1,
          line2: address2,
        })
      );

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            aToken: aToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(null);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("Dermatologist");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while adding the doctor");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm"
    >
      {/* Form Header */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Add Doctor</h2>
        <p className="text-sm text-slate-500 mt-1">Register a new medical professional to the platform.</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Upload Image Section */}
        <div className="flex flex-col sm:flex-row items-center gap-5 bg-slate-50 p-4 rounded-xl w-fit border border-slate-100">
          <label htmlFor="doc-img" className="cursor-pointer group relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl border-2 border-dashed border-slate-300 group-hover:border-indigo-500 transition-colors flex items-center justify-center overflow-hidden bg-white">
              <img
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt="Doctor"
                className={`object-cover ${docImg ? 'w-full h-full' : 'w-10 h-10 opacity-60'}`}
              />
            </div>
          </label>
          <input
            type="file"
            id="doc-img"
            accept="image/*"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-slate-700">Upload Doctor Photo</p>
            <p className="text-xs text-slate-400 mt-0.5">PNG, JPG up to 2MB</p>
          </div>
        </div>

        {/* Main Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {/* Left Column */}
          <div className="flex flex-col gap-5">
            <InputField label="Doctor Name" placeholder="Dr. John Doe" value={name} onChange={setName} />
            <InputField label="Doctor Email" type="email" placeholder="doctor@example.com" value={email} onChange={setEmail} />
            <InputField label="Password" type="password" placeholder="••••••••" value={password} onChange={setPassword} />
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Experience</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full border border-slate-200 text-slate-700 rounded-xl px-3.5 py-2.5 bg-white shadow-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.875rem_center] bg-no-repeat"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>
                    {i + 1} {i === 0 ? "Year" : "Years"}
                  </option>
                ))}
              </select>
            </div>

            <InputField label="Fees" type="number" placeholder="E.g. 500" value={fees} onChange={setFees} />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Speciality</label>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="w-full border border-slate-200 text-slate-700 rounded-xl px-3.5 py-2.5 bg-white shadow-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.875rem_center] bg-no-repeat"
              >
                <option>Gynecologist</option>
                <option>General Physician</option>
                <option>Dermatologist</option>
                <option>Pediatricians</option>
                <option>Neurologist</option>
                <option>Gastroenterologist</option>
              </select>
            </div>

            <InputField label="Education" placeholder="E.g. MBBS, MD" value={degree} onChange={setDegree} />

            <div className="flex flex-col gap-3.5">
              <label className="text-sm font-medium text-slate-700 -mb-1">Clinic Address</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField placeholder="Address Line 1" value={address1} onChange={setAddress1} hideLabel />
                <InputField placeholder="Address Line 2" value={address2} onChange={setAddress2} hideLabel />
              </div>
            </div>
          </div>
        </div>

        {/* About Component */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">About Doctor</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={4}
            placeholder="Write a brief professional bio details..."
            className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm resize-none"
          />
        </div>

        {/* Form Footer/Action Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.98] w-full sm:w-fit text-sm"
          >
            Save Profile & Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

// Enhanced Reusable Input Component
const InputField = ({ label, value, onChange, type = "text", placeholder, hideLabel = false }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {!hideLabel && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <input
        type={type}
        value={value}
        required={!hideLabel} // Nested fields can bypass standard requirement rules if preferred
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm text-slate-800 placeholder:text-slate-400"
      />
    </div>
  );
};

export default AddDoctor;