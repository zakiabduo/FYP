Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

If you'd like to contribute:
1. **Fork** the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature# 🏥 HealthSync — AI-Powered Healthcare & Telehealth Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green.svg)](https://mongodb.com)
[![Real-Time](https://img.shields.io/badge/RealTime-Socket.io-black.svg)](https://socket.io)
[![AI Integration](https://img.shields.io/badge/AI-Google_Gemini-orange.svg)](https://ai.google.dev)
[![Payments](https://img.shields.io/badge/Payments-Stripe-6772e5.svg)](https://stripe.com)

> An enterprise-grade, full-stack healthcare platform designed to simplify patient-doctor interactions through real-time communication, automated payments, and AI-assisted symptom triage.

---

## 🌟 Key Features

### 🤖 AI Medical Assistant (Google Gemini API)
* **Pre-Consultation Triage:** Interactive symptom checker to assist patients before booking.
* **Specialist Recommendations:** Automated suggestions for relevant medical fields based on user inputs.

### 💬 Real-Time Consultation (Socket.io)
* **Direct Messaging:** Low-latency chat rooms restricted to specific appointment sessions.
* **Live Indicators:** Real-time presence detection and message delivery status updates.
* **Chat History:** Persistent records stored securely for post-consultation review.

### 💳 Booking & Payment System (Stripe)
* **Automated Payments:** Smooth checkout flow for consultation fees.
* **Webhook Processing:** Automatic status sync for confirmed bookings and cancellations.
* **Conflict Prevention:** Real-time slot locking to avoid double-booking.

### 🔒 Access Control & Portals
* **Role-Based Access Control (RBAC):** Separate workflows for **Patients**, **Doctors**, and **Administrators**.
* **Medical Records:** Generation and tracking of digital prescriptions and clinical notes.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, Axios, React Router, Socket.io-client
* **Backend:** Node.js, Express.js, Socket.io
* **Database:** MongoDB, Mongoose ODM
* **AI Integration:** Google Gemini API (`@google/generative-ai`)
* **Payments:** Stripe API & Webhooks
* **Authentication:** JSON Web Tokens (JWT), bcrypt.js

---

## 🚀 Getting Started

### Prerequisites
* **Node.js:** v18.0.0 or higher
* **Database:** MongoDB local instance or MongoDB Atlas URI
* **API Keys:** Stripe Account Keys and Google Gemini API Key

### Installation & Local Setup

Backend Configuration

Bash
cd backend
npm install
Create a .env file in the backend directory:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
CLIENT_URL=http://localhost:3000
Frontend Configuration

Bash
cd ../frontend
npm install
Running the Application

Bash
# Run backend (from /backend directory)
npm run dev

# Run frontend (from /frontend directory)
npm start
