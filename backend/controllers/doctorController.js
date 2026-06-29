import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import sendEmail from "../config/nodemailer.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId;
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Mark Appointment Completed & Email Patient
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });

      // 📧 EMAIL NOTIFICATION TO USER (Appointment Completed)
      const emailMessage = `Hello ${appointmentData.userData.name},\n\nYour appointment with Dr. ${appointmentData.docData.name} on ${appointmentData.slotDate} at ${appointmentData.slotTime} has been successfully completed.\n\nThank you for choosing Doclo! We hope you had a great experience.`;
      await sendEmail({
        email: appointmentData.userData.email,
        subject: "Appointment Completed - Doclo",
        message: emailMessage
      });

      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      res.json({ success: false, message: "Mark Failed. Unauthorized action." });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Cancel Appointment & Email Patient
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.docId;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

      const { slotDate, slotTime } = appointmentData;
      const docData = await doctorModel.findById(docId);
      
      if (docData && docData.slots_booked) {
        let slots_booked = docData.slots_booked;
        if (slots_booked[slotDate]) {
          slots_booked[slotDate] = slots_booked[slotDate].filter((time) => time !== slotTime);
          await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        }
      }

      // 📧 EMAIL NOTIFICATION TO USER (Appointment Cancelled by Doctor)
      const emailMessage = `Hello ${appointmentData.userData.name},\n\nWe regret to inform you that your appointment with Dr. ${appointmentData.docData.name} scheduled for ${slotDate} at ${slotTime} has been cancelled by the doctor.\n\nWe apologize for any inconvenience caused. Please log in to book a new slot or choose another doctor.`;
      await sendEmail({
        email: appointmentData.userData.email,
        subject: "Appointment Cancelled - Doclo",
        message: emailMessage
      });

      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      res.json({ success: false, message: "Cancellation Failed. Unauthorized action." });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId;
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const profileData = await doctorModel.findById(docId).select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const { fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentCancel, appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile,
};