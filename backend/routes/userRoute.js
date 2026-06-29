// Top par imports mein paymentStripe aur verifyStripe add karein


import express from  'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentStripe, verifyStripe } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'
import { chatWithAI } from '../controllers/aiController.js'


const userRouter = express.Router()

// Niche routes list mein yeh add karein:
userRouter.post('/ai-chat', chatWithAI)
userRouter.post('/payment-stripe', authUser, paymentStripe);
userRouter.post('/verify-stripe', authUser, verifyStripe);
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post(
  '/update-profile',
  authUser,
  upload.single("image"),
  updateProfile
)
userRouter.post("/book-appointment",authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)


export default userRouter