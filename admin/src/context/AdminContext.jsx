import axios from "axios";
import { useState, createContext } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext();

const AdminContextProvider = (props) => {

  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken")|| "");

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ✅ GET ALL DOCTORS
  const getAllDoctors = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/admin/all-doctors`,
        {},
        {
          headers:{ aToken }
        }
      );

      const data = response.data;

      if (data.success) {
        setDoctors(data.doctors);
        console.log("Doctors:", data.doctors);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ✅ CHANGE DOCTOR AVAILABILITY
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ GET ALL APPOINTMENTS
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/appointments",
        { headers: { aToken } }
      );

      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ✅ CANCEL APPOINTMENT
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };
  const getDashData = async()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}})
      if (data.success){
        setDashData(data.dashData)
        console.log(data.dashData);
        
      }else{
        toast.error(data.message)
      }
    } catch (error) {
            toast.error(error.message);

    }
  }

  // ✅ VALUE OBJECT (THIS WAS MISSING)
  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,getDashData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;