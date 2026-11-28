# MemberPass — Intelligent Membership Management Platform

MemberPass is a full-stack digital membership management platform designed for yoga and wellness centres, unifying encrypted QR check-ins, Razorpay payment processing, class quota enforcement, and contextual AI assistance.

- **Live Application:** [https://member-pass-one.vercel.app/](https://member-pass-one.vercel.app/)
- **GitHub Repository:** [https://github.com/Yogeshwaran16/MemberPass](https://github.com/Yogeshwaran16/MemberPass)
- **Deployment Stack:** Vercel (Frontend SPA) + Render (Backend REST API) + MongoDB Atlas

---

## 1. Project Overview

MemberPass eliminates paper sign-in sheets, fragmented spreadsheets, and manual attendance tracking for wellness studios. It provides studio operators with optical QR pass verification, automated subscription activations, annual membership pause handling, and an intelligent member co-pilot—delivering a seamless, paperless experience for both staff and practitioners.

---

## 2. Recordings & Demos

- **Project Walkthrough & Feature Demo (2-minute):** [Watch on Google Drive](https://drive.google.com/file/d/1CUbY-3_POvYqSfiJ9Pl7LZ6kgMd1t7Ly/view?usp=drive_link)
- **AI Assistant Interactive Demo:** [Watch on Google Drive](https://drive.google.com/file/d/1fwrtrS6UBK4WVvcbqdWlY_ruVN5VwnjH/view?usp=sharing)

---

## 3. Test Logins

The following accounts are pre-configured through the database seeding script (`backend/scripts/seed.js`). All test accounts use the universal demonstration password below.

> **Universal Demo Password:** `MemberPass@123`

| Role | Name | Email | Account State / Purpose |
|---|---|---|---|
| **Staff / Admin** | MemberPass Staff | `m2.staff@example.com` | Camera-based QR pass scanner, attendance history audit, and check-in logs. |
| **Member (Active — Basic)** | Arun Kumar | `arun1@example.com` | Active Basic plan; 8 of 8 classes used (tests class quota enforcement). |
| **Member (Active — Standard)** | Priya Devi | `priya2@example.com` | Active Standard plan; 3 of 25 classes used; valid digital pass. |
| **Member (Active — Premium)** | Karthik Raj | `karthik3@example.com` | Active Premium plan; unlimited classes, 90-day extended validity. |
| **Member (Paused)** | Janani R | `janani20@example.com` | Paused Basic plan (tests pause/resume behavior and scan rejection). |
| **Member (Ended / Expired)** | Manoj T | `manoj13@example.com` | Expired Basic plan (tests automated gate denial for ended memberships). |

*Note: All credentials listed above are purely fictional demonstration accounts.*

---

## 4. What It Does (5 Core Capabilities)

1. **Digital Identity Pass & Optical QR Check-In:** Members receive a unique digital pass with encrypted tokens. Staff scan passes via any device camera or optical reader with sub-second validation and IST calendar-day duplicate check-in prevention.
2. **Online Membership Activation via Razorpay:** Practitioners select between Basic (₹1,500), Standard (₹3,000), or Premium (₹7,500) plans, complete checkout through Razorpay test mode, and receive instant, webhook-verified plan activations.
3. **Strict Class Quota & Concurrency Enforcement:** Enforces membership tier class boundaries (Basic: 8 classes, Standard: 25 classes, Premium: unlimited) via atomic database operations (`$inc` with `$lt` guards) to prevent race conditions during peak entry times.
4. **Self-Service Membership Pause with Expiry Extension:** Active members can pause their pass once per calendar year for 1 to 15 days directly from their portal, automatically freezing their class counter and extending their expiry date.
5. **Contextual AI Membership Co-Pilot:** Provides interactive answers regarding renewal schedules, remaining session balances, tier benefits, and studio policies, tailored dynamically to the authenticated member.

---

## 5. The AI Feature

### What It Does
The MemberPass AI Assistant serves as an intelligent concierge for practitioners and studio operators:
- **Personalized Member Queries:** When authenticated, the assistant securely inspects the member's live MongoDB record to provide exact details on remaining classes, pass validity dates, and renewal status.
- **Studio Policy & Plan Guidance:** Answers general questions regarding class schedules, pricing tiers, freeze policies, and QR pass usage.
- **Staff Absentee Drafts:** Generates structured follow-up drafts for members flagged with extended studio absence.

### Architecture & Graceful Fallback
- **Hybrid Service Architecture:** The backend route (`/api/ai/chat`) is designed to interface with an external AI service endpoint (`AI_SERVICE_URL`).
- **Built-in Deterministic Fallback Engine:** To guarantee zero downtime, MemberPass incorporates an internal rule-based contextual engine in Node.js. If the external microservice is unreachable or unconfigured, the system automatically queries MongoDB directly and returns real-time membership and pricing data.
- **Service Limitation:** The external AI microservice model is decoupled; no unverified third-party proprietary model names are hardcoded into production.

---

## 6. Technology Stack

| Layer | Technology | Reason Selected |
|---|---|---|
| **Frontend Framework** | React 19 + Vite 8 | High-performance Single Page Application (SPA) architecture with fast HMR and optimized asset bundling. |
| **Styling & Design** | Pure Modern CSS | Custom Sanctuary Wellness design system (Linen `#F7F6F2`, Forest Green `#244B3C`, Champagne Gold `#C5A878`). Zero stock photos—100% typography, SVG graphics, and CSS geometry. |
| **QR Scanner** | `html5-qrcode` | Browser-native camera access for real-time barcode/QR scanning on mobile and desktop without native plugins. |
| **Backend Runtime** | Node.js + Express 5 | Asynchronous REST API, custom authentication middleware (`staffOnly`), and raw buffer capture for webhook signatures. |
| **Database & ODM** | MongoDB Atlas + Mongoose 9 | Flexible document modeling with compound indexing on check-ins and unique sparse indexes for payment idempotency. |
| **Authentication** | JWT (`jsonwebtoken`) + `bcryptjs` | Stateless token authentication with bcrypt password hashing (salt rounds: 12) and pre-save re-hash safeguards. |
| **Payment Gateway** | Razorpay SDK + HMAC-SHA256 | Test-mode order creation, client signature validation, and raw webhook verification using `crypto.timingSafeEqual`. |
| **Email Service** | Nodemailer (SMTP) | Automated expiry reminder dispatch with distributed lock claiming (`crypto.randomUUID()`) to prevent duplicate notices. |
| **Hosting & CI/CD** | Vercel & Render | Edge frontend hosting on Vercel; containerized backend execution on Render connected to GitHub. |
| **Development AI Tools** | Google Antigravity & Copilot | Used for automated test-suite orchestration, performance profiling, and code review during development. |

---

## 7. Main Design Choices & Database Schemas

### Key Architectural Choices
1. **Webhook-Driven Payment Idempotency:** Client-side payment authorization is never trusted alone. Membership activation occurs upon receiving Razorpay's `payment.captured` webhook, verified via HMAC-SHA256 and deduplicated through a dedicated `WebhookEvent` collection.
2. **Atomic Attendance Operations:** Check-ins use atomic `findOneAndUpdate` queries with a class-limit constraint filter, eliminating race conditions when multiple scanners read the same code concurrently.
3. **Resilient AI Intermediary:** The backend acts as a proxy that shields the client from external AI service failures, falling back to local database queries instantly.

### Database Schema Overview

```
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│              User               │       │              Plan               │
├─────────────────────────────────┤       ├─────────────────────────────────┤
│ _id: ObjectId                   │       │ _id: ObjectId                   │
│ name: String                    │       │ name: String (Basic/Std/Prem)   │
│ email: String (unique)          │       │ priceInPaise: Number            │
│ password: String (bcrypt)       │       │ durationDays: Number            │
│ role: 'member' | 'staff'        │       │ classLimit: Number | null       │
│ passCode: String (unique)       │       │ isActive: Boolean               │
└────────────────┬────────────────┘       └────────────────┬────────────────┘
                 │ 1                                       │ 1
                 │                                         │
                 │ 1..*                                    │ 1..*
┌────────────────┴────────────────┐       ┌────────────────┴────────────────┐
│           Membership            │◄──────┤             Payment             │
├─────────────────────────────────┤  ref  ├─────────────────────────────────┤
│ _id: ObjectId                   │       │ _id: ObjectId                   │
│ user: ObjectId (ref User)       │       │ razorpayOrderId: String         │
│ plan: ObjectId (ref Plan)       │       │ razorpayPaymentId: String       │
│ status: 'active'|'paused'|'ended│       │ amount: Number (in paise)       │
│ classesUsed: Number             │       │ status: 'captured' | 'failed'   │
│ startDate / endDate: Date       │       └─────────────────────────────────┘
│ pauseHistory: Array             │
└────────────────┬────────────────┘
                 │ 1
                 │ 0..*
┌────────────────┴────────────────┐       ┌─────────────────────────────────┐
│           Attendance            │       │          WebhookEvent           │
├─────────────────────────────────┤       ├─────────────────────────────────┤
│ _id: ObjectId                   │       │ _id: ObjectId                   │
│ checkInId: String (unique)      │       │ eventId: String (unique)        │
│ membership: ObjectId            │       │ eventType: String               │
│ member: ObjectId                │       │ processedAt: Date               │
│ checkedInAt: Date               │       └─────────────────────────────────┘
└─────────────────────────────────┘
```

---

## 8. How to Run It on Your Computer

### Prerequisites
- Node.js (v18.x or later)
- MongoDB instance running locally (`mongodb://127.0.0.1:27017/memberpass`) or a MongoDB Atlas URI
- Git

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/Yogeshwaran16/MemberPass.git
cd MemberPass

# 2. Setup and seed the Backend
cd backend
npm install
npm run seed       # Seeds plans, test members, and staff account
npm run dev        # Starts backend API on http://localhost:5000

# 3. Setup and start the Frontend (in a separate terminal)
cd ../frontend
npm install
npm run dev        # Starts Vite dev server on http://localhost:5173
```

### Required Environment Variables

Create `.env` files in their respective folders with the following variable keys:

#### Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Razorpay Test Credentials
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
RAZORPAY_WEBHOOK_SECRET=<your-webhook-secret>

# Email Notification Settings (Optional for local testing)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=<your-smtp-email>
SMTP_PASS=<your-smtp-app-password>
EMAIL_FROM="MemberPass <noreply@memberpass.com>"
REMINDER_TEST_EMAIL=<your-test-email>

# Optional AI Service URL
AI_SERVICE_URL=http://127.0.0.1:8000
```

#### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000
```

---

## 9. How to Run the Tests

MemberPass includes automated test suites covering payments, webhooks, optical QR verification, and class limit concurrency.

### Running Test Suites

```bash
# 1. Run the Razorpay Payment & Webhook Verification Suite (35 Tests)
node backend/scripts/test-razorpay-suite.js

# 2. Run the QR Check-In & Class Limit Concurrency Suite (20 Tests)
node backend/scripts/test-qr-classlimit-suite.js

# 3. Verify the Frontend Production Build
cd frontend
npm run build
```

### Verified Test Results
- **Payment & Webhook Test Suite:** **35 / 35 PASS** (100% passing across HMAC verification, idempotency, order validation, and duplicate rejection).
- **QR Attendance & Class Limit Suite:** **20 / 20 PASS** (100% passing across optical payload parsing, daily duplicate checks, and atomic quota enforcement).
- **Frontend Production Build:** **PASS** (Zero errors; clean production bundle compiled with Vite).

---

## 10. Made-Up Data

- **Data Origin:** All pre-populated practitioners, past attendance records, and membership passes are **100% synthetically generated** by `backend/scripts/seed.js`.
- **Privacy & Safety:** 
  - Contains **no real person, customer, or payment data**.
  - All email addresses use the reserved RFC 2606 domain (`@example.com`).
  - Phone numbers are sequential test strings (`9876500001` – `9876500020`).
  - All Razorpay orders and payment IDs are mock demonstration identifiers (`order_seed_*`, `pay_seed_*`).

---

## 11. What Works

### Fully Working
- [x] Responsive Sanctuary Wellness UI/UX across desktop, tablet, and mobile.
- [x] JWT authentication for members and staff with role-based route guards.
- [x] Digital membership pass generation with encrypted QR tokens.
- [x] Camera-based optical QR check-in scanner on staff portal.
- [x] IST calendar-day duplicate check-in prevention.
- [x] Tier class quota enforcement (Basic: 8, Standard: 25, Premium: unlimited) with atomic concurrency protection.
- [x] Razorpay order creation, client checkout integration, and HMAC signature verification.
- [x] Raw buffer webhook verification with `crypto.timingSafeEqual` and event idempotency.
- [x] Self-service membership pause (1–15 days, 1/calendar year) with automatic expiry extension.
- [x] Automated expiry reminder background worker with distributed locking.
- [x] Contextual AI Assistant with live MongoDB queries and deterministic fallback.

### Partly Done
- [/] **External Python AI Microservice:** The Node.js backend includes the HTTP proxy client (`AI_SERVICE_URL`), but production runs primarily on the built-in deterministic engine.

### Skipped
- [-] **SMS Gateway Integration:** Notifications are delivered via email; SMS delivery was omitted to avoid third-party carrier costs.
- [-] **Physical Hardware Turnstile Integration:** Validation is completed via browser-based camera scanning rather than dedicated RFID/NFC turnstile hardware.

---

## 12. What I Would Do Differently With More Time

1. **Route-Level Code Splitting:** Implement `React.lazy()` for the Staff and Member dashboards to load the heavy `html5-qrcode` library on demand, reducing the initial bundle size below 300 kB.
2. **WebSockets for Live Staff Check-In Feeds:** Add Socket.io to update the staff door monitor in real time without manual page refreshes when a member scans in.
3. **Apple Wallet / Google Wallet Pass Export:** Generate signed `.pkpass` files so practitioners can add their MemberPass directly to their mobile OS wallet.
4. **Attendance Analytics & Capacity Heatmaps:** Provide visual SVG analytics for studio managers showing peak attendance hours and class popularity trends.
