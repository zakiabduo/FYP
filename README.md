# 🏥 HealthSync — Open-Source AI-Powered Doctor Appointment & Telehealth Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green.svg)](https://mongodb.com)
[![Real-time](https://img.shields.io/badge/Realtime-Socket.io-black.svg)](https://socket.io)
[![AI Integration](https://img.shields.io/badge/AI-Google_Gemini_API-orange.svg)](https://ai.google.dev)

> **HealthSync** is an enterprise-grade, full-stack healthcare platform connecting patients with medical professionals. It streamlines patient-doctor interactions using real-time messaging, AI-assisted symptom triage, automated payments, and smart scheduling.

---

## 🌟 Key Features

### 🤖 AI Medical Assistant (Google Gemini)
- **Interactive Symptom Triage** — natural language symptom assessment powered by the Google Gemini API.
- **Smart Specialist Matching** — automatically recommends relevant medical specialties based on patient input.
- **Pre-Consultation Insights** — generates summary briefs for doctors ahead of appointments.

### ⚡ Real-Time Consultation (Socket.io)
- **Direct Messaging** — instant, low-latency chat sessions locked to valid appointment IDs, with full chat history persistence.
- **Typing & Read Indicators** — real-time presence and message status tracking.
- **Secure Rooms** — JWT-authenticated WebSocket handshakes for private communication channels.

### 💳 Payments & Booking
- **Stripe Integration** — secure checkout for online consultation fees.
- **Webhook Handlers** — automated state sync for booking confirmations and refunds.
- **Schedule Conflict Prevention** — algorithmic slot locking to prevent double-booking.

### 🧑‍⚕️ Multi-Role Portals
- Dedicated dashboards for **Patients**, **Doctors**, and **Admins**, with JWT-based Role-Based Access Control (RBAC).

### 📋 Digital Medical Records
- Direct generation and management of digital prescriptions and consultation notes.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Tailwind CSS, Axios, React Router, Socket.io-client |
| **Backend** | Node.js, Express.js, Socket.io |
| **Database** | MongoDB, Mongoose ODM |
| **AI Engine** | Google Gemini API (`@google/generative-ai`) |
| **Payments** | Stripe API (Checkout & Webhooks) |
| **Authentication** | JSON Web Tokens (JWT), bcrypt.js |

---

## 🏗️ System Architecture & Workflow

```text
[ Patient Portal ] ──(Gemini AI Triage)──> [ Find Doctor & Select Slot ]
         │                                               │
  (Socket.io Chat)                                 (Stripe Payment)
         │                                               │
         ▼                                               ▼
[ Real-Time Consultation ] <──(Appointment Confirmed)── [ Node/Express Server ]
                                                                 │
                                                          [ MongoDB Database ]
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (>= v18.0.0)
- MongoDB (local instance or MongoDB Atlas URI)
- Stripe Developer Account (Publishable & Secret Keys)
- Google AI Studio (Gemini) API Key

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/healthsync.git
cd healthsync
```

**2. Backend setup**
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
GEMINI_API_KEY=your_google_gemini_api_key
CLIENT_URL=http://localhost:3000
```

**3. Frontend setup**
```bash
cd ../frontend
npm install
```

**4. Run the application**
```bash
# In /backend
npm run dev

# In /frontend (new terminal)
npm start
```

---

## 🤝 Contributing

Contributions make the open-source community an incredible place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag `enhancement`.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.
