#  Training Portal

A full-stack Training Management System built with **MERN stack** to manage trainees, track their progress, and allow instructors to assign and monitor training modules.

---

##  Features

- 👤 User Registration & Login (JWT Auth)
- 🧑‍🎓 Role-based access: Trainees and Instructors
- 📊 Progress Tracking (Completed / Pending modules)
- ✏️ Update username and password
- 📈 Instructor dashboard with trainee insights
- 🌐 Protected routes & clean UI

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JSON Web Tokens (JWT)

---

## 🚀 Getting Started

### 🖥️ Clone the repository

```bash
git clone https://github.com/SakshiMujawadiya/TaskDashboard.git
cd Dashboard 

📦 Backend Setup

cd backend
npm install

PORT=5000
MONGO_URI=mongodb://localhost:27017/task_management
JWT_SECRET=secret123
Run backend server:
nodemon index.js

🌐 Frontend Setup

cd frontend
npm install
npm run dev

 # 📁 Folder Structure

Dashboard/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   └── App.jsx


#📬 API Endpoints
Auth:

POST /api/auth/register – Register new user

POST /api/auth/login – Login and receive token

PATCH /api/auth/update-password – Change password

PATCH /api/auth/update-username – Update name

Instructor:

GET /api/instruct/trainees/progress – Get all trainees' progress

GET /api/instruct/insights – Dashboard stats for instructors

🛡️ Protected Routes
Add this header to all protected requests:
Authorization: Bearer <your_token>
