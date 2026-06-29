import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currency, backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  const getAvailableSlot = async () => {
    if (!docInfo) return;
    const slots = [];
    const now = new Date();
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(Math.max(10, now.getHours()));
        currentDate.setMinutes(now.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlot = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTimeStr = formattedTime;

        const isSlotBooked =
          docInfo.slots_booked &&
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTimeStr);

        const isPast = i === 0 && currentDate.getTime() < now.getTime();

        timeSlot.push({
          datetime: new Date(currentDate),
          time: formattedTime,
          available: !isSlotBooked && !isPast,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // 🔥 LOGIC UPDATE: Check if this entire day has ANY active/available slot or not
      // If all elements have available: false, then isDayFullyBooked becomes true
      const isDayFullyBooked = timeSlot.length > 0 && timeSlot.every(slot => !slot.available);

      // Inject custom flag into array property metadata injection
      slots.push({
        slotsArray: timeSlot,
        isFullyBooked: isDayFullyBooked,
        dateObject: new Date(today.getDate() + i) // keep track for empty lists logs safely
      });
    }

    setDocSlots(slots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    try {
      const currentDayGroup = docSlots[slotIndex];
      const selectedSlot = currentDayGroup?.slotsArray?.find(
        (slot) => slot.time === slotTime,
      );

      if (!selectedSlot || !selectedSlot.available) {
        return toast.error("Please select a valid available time slot");
      }

      const date = selectedSlot.datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } },
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (docInfo) getAvailableSlot();
  }, [docInfo]);

  useEffect(() => {
    if (doctors && docId) {
      const foundDoc = doctors.find((doc) => doc._id === docId);
      setDocInfo(foundDoc || null);
    }
  }, [doctors, docId]);

  if (!docInfo) {
    return (
      <div className="flex justify-center items-center h-[50vh] w-full">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-500">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto py-8">
      
      {/* Doctor Card Profile Frame */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
        <div className="w-full md:w-1/4 shrink-0 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between gap-4 py-1">
          <div>
            <h1 className="font-extrabold text-2xl text-slate-800 tracking-tight flex items-center gap-2">
              {docInfo.name}
              <img className="w-5 h-5 object-contain" src={assets.verified_icon} alt="Verified Badge" />
            </h1>

            <div className="flex items-center gap-2 mt-2">
              <p className="text-slate-500 font-medium text-sm">
                {docInfo.degree} — <span className="text-indigo-600 font-semibold">{docInfo.speciality}</span>
              </p>
              <span className="text-[11px] font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200/40">
                {docInfo.experience}
              </span>
            </div>

            <div className="mt-4 bg-slate-50/60 border border-slate-100 p-4 rounded-xl">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">About Clinical Specialist</h4>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                {docInfo.about}
              </p>
            </div>
          </div>

          <p className="text-base font-bold text-slate-800 flex items-center gap-1.5 border-t border-slate-100 pt-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Consultation Fee</span>
            <span className="text-indigo-600">{currency}</span>
            {docInfo.fees}
          </p>
        </div>
      </div>

      {/* Booking Slot Panel Area */}
      <div className="mt-10 bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Select Booking Slot
        </h3>

        {/* Days Carousel Layout */}
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => {
              const isSelected = slotIndex === index;
              const isFullyBooked = item.isFullyBooked;
              const firstSlotMeta = item.slotsArray[0];
              
              // Safe calculations fallback date strings parsing loops
              const dayDate = firstSlotMeta ? firstSlotMeta.datetime.getDate() : new Date().getDate() + index;
              const dayDayLabel = firstSlotMeta ? daysOfWeek[firstSlotMeta.datetime.getDay()] : daysOfWeek[index];

              return (
                <div
                  key={index}
                  onClick={() => !isFullyBooked && setSlotIndex(index)}
                  className={`text-center py-3.5 px-4 min-w-[80px] rounded-xl transition-all border relative flex flex-col items-center justify-center ${
                    isFullyBooked
                      ? "bg-red-50/40 border-red-100 text-red-300 cursor-not-allowed opacity-65"
                      : isSelected
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10 cursor-pointer"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer"
                  }`}
                >
                  {/* Dynamic Red Cross watermark line when day is filled */}
                  {isFullyBooked && (
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400/80 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                  )}

                  <p className={`text-[10px] font-bold tracking-wider ${isFullyBooked ? 'text-red-300' : isSelected ? "text-indigo-100" : "text-slate-400"}`}>
                    {dayDayLabel}
                  </p>
                  <p className={`text-base font-extrabold mt-0.5 ${isFullyBooked ? 'line-through text-red-400/60' : ''}`}>
                    {dayDate}
                  </p>
                </div>
              );
            })}
        </div>

        {/* Time Slots Selection List */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Available Hours</p>
          
          <div className="flex gap-2.5 flex-wrap">
            {docSlots[slotIndex]?.slotsArray?.length === 0 && (
              <p className="text-xs font-semibold text-slate-400 py-2">No clinical session slots configured for this selection.</p>
            )}

            {docSlots.length > 0 &&
              docSlots[slotIndex]?.slotsArray?.map((item, index) => {
                const isSelected = item.time === slotTime && item.available;
                return (
                  <button
                    key={index}
                    disabled={!item.available}
                    onClick={() => setSlotTime(item.time)}
                    className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold rounded-xl px-4 py-2.5 border transition-all select-none ${
                      !item.available
                        ? "bg-red-50/60 text-red-400 border-red-100/70 line-through cursor-not-allowed opacity-75"
                        : isSelected
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-600/5"
                          : "text-slate-600 bg-white border-slate-200 hover:border-slate-300 cursor-pointer"
                    }`}
                  >
                    {!item.available ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-emerald-500"}`}></div>
                    )}
                    {item.time.toLowerCase()}
                  </button>
                );
              })}
          </div>
        </div>

        {/* Action button trigger layout validation */}
        {slotTime && docSlots[slotIndex]?.slotsArray?.find(s => s.time === slotTime)?.available && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={bookAppointment}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Confirm Consultation Appointment
            </button>
          </div>
        )}
      </div>

      {/* Related Doctors Block Component */}
      <div className="mt-4">
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  );
};

export default Appointment;