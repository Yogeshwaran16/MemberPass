# MemberPass – Premium AI-Powered Membership Management

### A smarter way to manage memberships.

## 🌐 Live Demo

- [Visit MemberPass](https://member-pass-one.vercel.app/)
- [View Project Demo on Google Drive](https://drive.google.com/file/d/1ouJMw_JM269OKIQe2eAkfXXbVzZPLNl1/view?usp=sharing)

## 📌 About the Project

MemberPass is a web-based membership management platform designed to make membership-related processes smarter, easier, and more convenient.

It combines modern web technologies with AI-powered capabilities to provide a streamlined digital membership experience. The platform focuses on simplifying membership registration, managing subscriptions, processing payments, generating digital membership passes, and tracking attendance.

## 🎯 Project Objectives

- Simplify membership management.
- Provide a user-friendly digital experience.
- Integrate AI-powered capabilities for membership-related tasks.
- Build a modern and responsive web application.
- Enable digital membership passes and QR-based attendance.
- Make membership-related processes more efficient.

## ✨ Key Highlights

- Modern and responsive web application interface.
- User registration and authentication.
- Membership plans and subscription management.
- Online payment integration using Razorpay.
- Digital membership passes with QR codes.
- QR-based membership validation and attendance tracking.
- Member and staff dashboards.
- AI-powered membership management capabilities.
- Deployed frontend and backend services.

## 🛠️ Technologies Used

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JSON Web Token (JWT) |
| AI/ML | Python, PyTorch |
| API | REST API |
| Payment Integration | Razorpay |
| Deployment | Vercel, Render |
| Version Control | Git & GitHub |

## 🚀 Getting Started

Follow these instructions to set up and run MemberPass locally.

### Prerequisites

Make sure you have installed:

- Node.js and npm
- Git
- MongoDB connection
- Python (if running the AI module)

### 1. Clone the Repository

```bash
git clone https://github.com/Yogeshwaran16/MemberPass.git
```

### 2. Navigate to the Project

```bash
cd MemberPass
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Configure Frontend Environment

Create a `.env` file inside the `frontend` folder and add:

```env
VITE_API_URL=https://memberpass-2i1w.onrender.com/api
```

For local backend development, use:

```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Run the Frontend

```bash
npm run dev
```

The frontend will be available at the local URL displayed in your terminal.

### 6. Install Backend Dependencies

Open another terminal from the project root and run:

```bash
cd MemberPass/backend
npm install
```

### 7. Configure Backend Environment

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Configure the required Razorpay credentials in the backend environment if payment integration is enabled.

**Important:** Never commit your `.env` files or expose secret credentials on GitHub.

### 8. Run the Backend

From the backend folder, run:

```bash
npm run dev
```

The backend server will run on the configured port.

## 🔗 Project Links

- **Live Website:** https://member-pass-one.vercel.app/
- **Project Demo:** https://drive.google.com/file/d/1ouJMw_JM269OKIQe2eAkfXXbVzZPLNl1/view?usp=sharing
- **Backend API:** https://memberpass-2i1w.onrender.com
- **Backend Health Check:** https://memberpass-2i1w.onrender.com/api/health
- **GitHub Repository:** https://github.com/Yogeshwaran16/MemberPass

## 🔮 Future Enhancements

- Enhanced AI-powered membership assistance.
- Advanced membership analytics and insights.
- Improved member engagement features.
- Enhanced dashboard capabilities.
- More personalized membership experiences.
- Additional automation for membership-related processes.

## 📌 Project Status

The project is currently under development. Features and functionality may evolve as development progresses.

---

## 👨‍💻 Developed By

**MemberPass Project Team**

### MemberPass – Smarter Membership. Better Experiences.