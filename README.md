# 📝 Note Management App

## Overview
This project is a full-stack Note Management application that allows users to create, view, update, and delete notes. Users can upload files along with their notes, making it ideal for managing study materials, work documents, or personal notes.

The project is divided into **frontend** (React) and **backend** (Node.js + Express + MongoDB), with **JWT-based authentication** for secure user sessions.

---

## Frontend (React)

### Key Features
- **User Authentication**: Login and Signup with JWT token stored in `localStorage`.
- **Dashboard**: Personalized dashboard displaying all user notes.
- **Add Notes**: Form to add new notes including title, subject, description, and file upload.
- **Edit/Delete Notes**: Inline editing and deleting notes.
- **File Management**: Users can view or download uploaded files.
- **Responsive & Styled Components**: Clean UI with cards, buttons, and hover effects.
- **Environment Variables**: API base URL configurable via `.env` file using `REACT_APP_API_BASE_URL`.

### Tech Stack
React, Axios, Context API, React Router DOM, CSS-in-JS.

---

## Backend (Node.js + Express + MongoDB)

### Key Features
- **RESTful APIs**: CRUD endpoints for notes (`/api/v1/notes`) and authentication (`/api/v1/auth`).
- **JWT Authentication**: Secure login/signup, token validation middleware for protected routes.
- **File Uploads**: Supports PDF, DOC, DOCX using `multer`.
- **Data Storage**: MongoDB for persisting user and note data.
- **Error Handling**: Consistent responses and error messages for invalid requests.

### Tech Stack
Node.js, Express, MongoDB, Mongoose, JWT, Multer, dotenv.

---

## Environment Setup

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
 Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm start

📂 Project Structure
🧭 Frontend (src/)

src/
├─ api.js
├─ context/
│  └─ AuthContext.js
├─ components/
│  ├─ NoteForm.js
│  ├─ NoteList.js
│  └─ NoteDetails.js
└─ pages/
   ├─ Login.js
   ├─ Signup.js
   └─ Dashboard.js
⚙️ Backend (server/)

server/
├─ models/
│  ├─ User.js
│  └─ Note.js
├─ routes/
│  ├─ auth.js
│  └─ notes.js
├─ middleware/
│  └─ auth.js
├─ controllers/
│  ├─ authController.js
│  └─ noteController.js
└─ server.js

