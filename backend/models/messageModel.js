// backend/models/messageModel.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    appointmentId: { type: String, required: true }, // Jis appointment ke against chat ho rahi hai
    senderId: { type: String, required: true }, // Jisne message bheja (User ID ya Doctor ID)
    receiverId: { type: String, required: true }, // Jisko message bheja
    text: { type: String, required: true }, // Message ka text
    date: { type: Number, default: Date.now } // Time
});

const messageModel = mongoose.models.message || mongoose.model('message', messageSchema);

export default messageModel;