import express from 'express'
import cors from 'cors'
import "dotenv/config"
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import http from 'http'
import { Server } from 'socket.io'
import messageModel from './models/messageModel.js'

// app config
const app = express()
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// HTTP Server aur Socket.io Setup
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
})

// Real-time Chat Logic Engine Connection
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)

  // Room Join Event Listener
  socket.on("join_room", (room) => {
    socket.join(room)
    console.log(`Socket Room Joined Successfully: ${room}`)
  })

  // Chat History Pipeline channel (Synchronized directly with new frontend configuration hooks)
  socket.on("get_history", async (room) => {
    try {
      const messages = await messageModel.find({ appointmentId: room }).sort({ date: 1 });
      socket.emit("chat_history", messages);
    } catch (error) {
      console.log("Error fetching history layers:", error);
    }
  })

  // Message Send & Broadcast Engine
  socket.on("send_message", async (data) => {
    try {
      // Parse safe Date instance timestamp logs fallback to make sure data is never undefined
      const messageTimestamp = data.date ? data.date : Date.now();

      // Message ko Database state document array block mein push karein
      const newMessage = new messageModel({
        appointmentId: data.room,
        senderId: data.senderId,
        receiverId: data.receiverId,
        text: data.text,
        date: messageTimestamp
      })
      
      await newMessage.save()

      // Target chat room panel ke baqi active connections ko data broadcast karein instantly
      socket.to(data.room).emit("receive_message", data)
      
    } catch (error) {
      console.log("Real-time Message persistence error logs:", error)
    }
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected safely from terminal context:", socket.id)
  })
})

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user/', userRouter)

app.get('/', (req, res) => {
  res.send('API WORKING now good')
})

server.listen(port, () => console.log("Server Started on port", port))