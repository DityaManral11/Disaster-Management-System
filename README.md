# 🌍 Disaster Management System

A full-stack web application for managing disaster response and emergency situations.

## 🚀 Features

* User Registration & Login
* SOS Request System
* Emergency Alerts
* Shelter Management
* Volunteer Registration
* Volunteer Task Assignment
* Admin Dashboard
* Profile Management

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MySQL

## 📂 Project Structure

```txt
Disaster-Management-System/
│
├── client/
│   ├── src/
│   └── public/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── server.js
│
└── README.md
```

## 🔐 Environment Variables

Create a `.env` file inside the backend folder:

```env
DB_HOST=your_aiven_host
DB_PORT=11265
DB_USER=avnadmin
DB_PASSWORD=your_aiven_password
DB_NAME=defaultdb

JWT_SECRET=your_secret_key

PORT=5000
```

⚠️ Never upload real passwords, database credentials, or JWT secrets to GitHub.

## ⚙️ Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## 🌐 Deployment

### Frontend

Deploy on Render/Vercel.

### Backend

Deploy on Render Web Service.

Required Environment Variables:

```env
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
JWT_SECRET
PORT
```

## 👨‍💻 Author

Ditya Manral
