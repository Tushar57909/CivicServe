# CivicServe (Reliable Service Workers) - Backend API

Production-ready hackathon backend for **CivicServe (Reliable Service Workers)** built with Node.js, Express.js, PostgreSQL (Prisma ORM), JWT Authentication, and OpenRouter AI.

---

## 🛠️ Architecture & Features

- **Relational Database (PostgreSQL / SQLite via Prisma)**: Full models for Users, Workers, Services, Verifications, Bookings, Status Timelines, Reviews, Complaints, and Notifications.
- **Civic Trust Protocol Engine**: Deterministic mathematical formula (0-100) combining 4-layer KYC, rating quality, on-time arrival accuracy, and zero dispute streaks.
- **OpenRouter AI Integration**: Natural language service intent parser with smart worker recommendations and suspicious review audit (with fallback).
- **Two-Phase OTP Security**: Start OTP for job commencement and Completion OTP for escrow payout release.
- **Role-Based REST APIs**: Dedicated endpoints for Customers, Workers, and Civic Auditors.

---

## 🚀 Setup & Run Locally

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Database & Seed Demo Data
```bash
npm run db:setup
```

### 3. Start Development Server
```bash
npm run dev
# Server runs on http://localhost:5000
```

---

## 📡 Core API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/health` | GET | Service health check |
| `/api/auth/register` | POST | Customer or Worker registration |
| `/api/auth/login` | POST | JWT login (returns token & role) |
| `/api/auth/me` | GET | Authenticated user profile |
| `/api/services` | GET | Catalog with transparent rate cards |
| `/api/workers` | GET | Worker discovery with trust filters & distance |
| `/api/workers/:id` | GET | Verified pro profile with KYC badges & metrics |
| `/api/workers/:id/availability` | PATCH | Update dispatch status (Online/Busy/Offline) |
| `/api/bookings` | POST | Create escrow protected booking |
| `/api/bookings` | GET | List bookings for customer or worker |
| `/api/bookings/:id` | GET | Real-time booking tracking & OTP codes |
| `/api/bookings/:id/status` | PATCH | Transition lifecycle status |
| `/api/bookings/:id/verify-otp` | POST | Verify Start or Completion OTP |
| `/api/reviews` | POST | Submit verified review & update Trust Score |
| `/api/trust/worker/:workerId` | GET | 4-Pillar Civic Trust formula breakdown |
| `/api/complaints` | POST | File dispute with Civic Mediation |
| `/api/admin/metrics` | GET | Platform health, GMV, and verified pro % |
| `/api/admin/workers/verification` | GET | Worker KYC verification queue |
| `/api/admin/workers/:workerId/verify-kyc` | PATCH | Approve or reject KYC documents |
| `/api/admin/disputes/:disputeId/resolve` | PATCH | Full refund or release escrow funds |
| `/api/ai/parse-intent` | POST | OpenRouter Natural Language Intent & Matcher |

---

## ☁️ Deployment on Render

This backend includes `render.yaml` for 1-click deployment on Render:
- Build Command: `npm install && npx prisma generate && npx prisma db push && node prisma/seed.js`
- Start Command: `npm start`
