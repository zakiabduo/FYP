# 🩺 Doctor Appointment System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

A comprehensive, full-stack digital platform designed to streamline healthcare scheduling and management. The system seamlessly connects patients with qualified healthcare professionals, automates appointment booking, manages schedules, handles prescription records, and provides robust administrative analytics.

---

## 📋 Table of Contents

- [Features](#-features)
  - [Patient Portal](#1-patient-portal)
  - [Doctor Portal](#2-doctor-portal)
  - [Admin Dashboard](#3-admin-dashboard)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [System Architecture](#%EF%B8%8F-system-architecture)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Environment Variables](#environment-variables)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact & Support](#-contact--support)

---

## ✨ Features

### 1. Patient Portal
* **Doctor Search & Discovery:** Filter doctors by medical specialty, location, availability, rating, and consultation fees.
* **Instant Booking:** Real-time slot availability with instant appointment confirmation.
* **Appointment Management:** View upcoming, past, and canceled consultations; reschedule or cancel with automated policy enforcement.
* **Digital Medical History:** Access electronic prescriptions, diagnostic test reports, and doctor notes post-consultation.
* **Notifications & Reminders:** Automated SMS, Email, and Push Notifications for upcoming appointments.
* **Integrated Payments:** Secure payment processing via Stripe/PayPal with downloadable PDF invoices.

### 2. Doctor Portal
* **Schedule & Availability Management:** Flexible shift management, custom working hours, and slot duration configuration (15, 30, 60 mins).
* **Appointment Queue Management:** Accept, decline, or mark appointments as completed.
* **E-Prescriptions & Electronic Health Records (EHR):** Create digital prescriptions, add diagnoses, attach lab orders, and access past patient history.
* **Earnings & Analytics:** Dashboard showing daily/weekly revenue, completed visits, and patient feedback ratings.

### 3. Admin Dashboard
* **User & Role Management:** Verify doctor credentials, manage patient accounts, and set system RBAC (Role-Based Access Control).
* **Specialty & Facility Management:** Add and update medical departments, clinic locations, and service pricing.
* **Platform Analytics:** Real-time insights into total appointments, revenue trends, user growth, and active sessions.
* **System Audit Logs:** Detailed tracking of administrative actions for compliance and security.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js / Next.js, TypeScript, Tailwind CSS, Redux Toolkit |
| **Backend** | Node.js (Express.js) / Python (FastAPI / Django) |
| **Database** | PostgreSQL / MongoDB (Prisma / Mongoose ORM) |
| **Caching & Queue** | Redis (Session management & BullMQ background jobs) |
| **Authentication** | JWT (JSON Web Tokens), OAuth2.0 (Google Login), bcrypt |
| **Payment Gateway** | Stripe API / PayPal REST API |
| **Notifications** | Twilio (SMS), SendGrid (Email), Firebase Cloud Messaging (Push) |
| **DevOps & Hosting** | Docker, Nginx, GitHub Actions (CI/CD), AWS (S3, EC2, RDS) |

---

## 🏗️ System Architecture

```text
               +-------------------------------------------------+
               |              Client Layer (React.js)            |
               |  (Patient Web App / Doctor Portal / Admin UI)   |
               +------------------------+------------------------+
                                        |
                                  HTTPS | REST / GraphQL
                                        v
               +-------------------------------------------------+
               |          API Gateway / Reverse Proxy            |
               |                     (Nginx)                     |
               +------------------------+------------------------+
                                        |
                                        v
               +-------------------------------------------------+
               |             Backend Application Server          |
               |              (Node.js / Express / REST)         |
               +-------+----------------+----------------+-------+
                       |                |                |
             ORM / SQL |        Cache / |        Storage | AWS S3
                       v         Queue  v                v
         +---------------+    +-----------+    +-------------------+
         | PostgreSQL DB |    | Redis Cache|   | Digital Assets    |
         | (User/Appts)  |    | & Queues  |    | (Prescriptions)   |
         +---------------+    +-----------+    +-------------------+
```

---

## 🗄️ Database Schema

Key relational entities and relationships:

* **Users:** `id`, `name`, `email`, `password_hash`, `role` (patient, doctor, admin), `created_at`
* **Doctor Profiles:** `id`, `user_id`, `specialty`, `experience_years`, `bio`, `consultation_fee`
* **Schedules:** `id`, `doctor_id`, `day_of_week`, `start_time`, `end_time`, `slot_duration_mins`
* **Appointments:** `id`, `patient_id`, `doctor_id`, `appointment_date`, `time_slot`, `status` (`pending`, `confirmed`, `completed`, `cancelled`)
* **Prescriptions:** `id`, `appointment_id`, `doctor_id`, `patient_id`, `diagnosis`, `medications_json`, `notes`
* **Payments:** `id`, `appointment_id`, `amount`, `payment_method`, `status`, `transaction_id`

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
* **Node.js** (v18.0.0 or higher)
* **npm** or **yarn** or **pnpm**
* **PostgreSQL** (v14+) or **MongoDB** (v6+)
* **Redis** (optional, for background task queues)
* **Git**

---

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/doctor-appointment-system.git
   cd doctor-appointment-system/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy the example environment file and update your configuration settings:
   ```bash
   cp .env.example .env
   ```

4. **Run Database Migrations & Seeds:**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start the backend development server:**
   ```bash
   npm run dev
   ```
   The backend server will run on `http://localhost:5000`.

---

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   ```

4. **Start the frontend application:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

The backend requires the following keys in your `.env` file:

```env
# Server Config
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/doctor_db?schema=public

# Security / Auth
JWT_SECRET=super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_xxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxx

# Email & SMS Services
SENDGRID_API_KEY=SG.xxxxxxx
TWILIO_ACCOUNT_SID=ACxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

---

## 🔌 API Documentation

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register new user (Patient/Doctor) | Public |
| `POST` | `/api/v1/auth/login` | User login & JWT issuance | Public |
| `GET` | `/api/v1/doctors` | List doctors with filter parameters | Public |
| `GET` | `/api/v1/doctors/:id/slots` | Get available booking slots | Public |
| `POST` | `/api/v1/appointments` | Book an appointment slot | Patient |
| `GET` | `/api/v1/appointments/my` | Get current user's appointments | Patient / Doctor |
| `PATCH` | `/api/v1/appointments/:id/status` | Update status (Confirm/Cancel) | Doctor / Admin |
| `POST` | `/api/v1/prescriptions` | Create digital prescription | Doctor |
| `GET` | `/api/v1/admin/analytics` | Retrieve platform revenue/usage stats | Admin |

---

## 🧪 Testing

Run automated tests across unit and integration suites:

```bash
# Run unit tests
npm run test

# Run test coverage report
npm run test:coverage

# Run End-to-End (E2E) tests
npm run test:e2e
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

## 📧 Contact & Support

Project Maintainer - [Your Name](mailto:your.email@example.com)

Project Link: [https://github.com/your-username/doctor-appointment-system](https://github.com/your-username/doctor-appointment-system)
