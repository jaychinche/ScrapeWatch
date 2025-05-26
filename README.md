# 📊 ScrapeWatch

**ScrapeWatch** is a MERN-stack web-based admin panel that scrapes data from BBC News, stores it in MongoDB Atlas, and displays it in a cloud-hosted admin dashboard with light/dark theme support.

---

## 🌐 Live Demo

🚀 Frontend: [https://scrape-watch.vercel.app/](https://scrape-watch.vercel.app/)  
🔌 Backend API: [https://scrapewatch-api.onrender.com](https://scrapewatch-api.onrender.com)

---

## 🎯 Features

- 🔐 JWT Authentication (Login/Register)
- 🌗 Light/Dark Theme Toggle
- 📥 "Scrape Now" Button (BBC News Scraper)
- 📊 Paginated & Sortable Data Table
- ☁️ Cloud Deployment (Vercel + Render)
- 🔄 Real-time Data Updates

---

## ⚙️ Tech Stack

| Layer        | Technology               |
|--------------|--------------------------|
| Frontend     | React, Axios, Tailwind   |
| Backend      | Node.js, Express         |
| Scraper      | Cheerio, Axios           |
| Database     | MongoDB Atlas            |
| Auth         | JWT, Bcrypt              |
| Hosting      | Vercel (FE), Render (BE) |

---

## 🖼️ Screenshots

### Light Theme
| Splash Screen | Login Page |
|---------------|------------|
| <img width="1440" alt="Light Splash" src="https://github.com/user-attachments/assets/870b197e-e895-4ae4-9cc5-b20114808be9" width="300"> | <img width="1440" alt="Light Login" src="https://github.com/user-attachments/assets/c56e9fe4-a057-4183-8d5f-cb06cca9f25e" width="300"> |

| Dashboard | Scraper Active |
|-----------|----------------|
| <img width="1440" alt="Light Dashboard" src="https://github.com/user-attachments/assets/a379575c-733e-452e-9440-087de9703314" width="300"> | <img width="1440" alt="Light Scrape" src="https://github.com/user-attachments/assets/81605aab-ad30-41dc-b1a1-37d335c995dd" width="300"> |

### Dark Theme
| Splash Screen | Login Page |
|---------------|------------|
| <img width="1440" alt="Dark Splash" src="https://github.com/user-attachments/assets/49964b09-0de6-41aa-a33c-f2dabce0d3e8" width="300"> | <img width="1440" alt="Dark Login" src="https://github.com/user-attachments/assets/f4ebba3b-dc4e-48b8-bb84-0741f4b2f195" width="300"> |

| Dashboard | Scraper Active |
|-----------|----------------|
| <img width="1440" alt="Dark Dashboard" src="https://github.com/user-attachments/assets/74f0d056-8f49-47b3-a1d6-5657d400cb8b" width="300"> | <img width="1440" alt="Dark Scrape" src="https://github.com/user-attachments/assets/20582e41-3cb7-4eca-9972-aa4065e1ea1a" width="300"> |

---

## 🚀 Deployment Guide

### 1. Backend Setup (Node.js + Express)

cd backend
npm install
Create .env file:

env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/scrapewatch
JWT_SECRET=your_secure_jwt_secret
PORT=3001
Start server:

bash
npm start
## 2. Frontend Setup (React)
bash
cd frontend
npm install
Create .env file:

env
VITE_API_URL=http://localhost:3001
Start dev server:

bash
npm run dev

## Cloud Deployment
MongoDB Atlas
Create free cluster at mongodb.com

Whitelist IP (0.0.0.0 for all) and create DB user

Get connection string for .env

## Backend (Render)
Connect GitHub repo to Render

Set environment variables:

MONGO_URI

JWT_SECRET

Deploy!

## Frontend (Vercel)
Import Git repo in Vercel

Set environment variable:

env
VITE_API_URL=https://your-render-backend.onrender.com
Deploy!

## 🛠️ Development Scripts
Backend:

bash
npm start       # Start production server
npm run dev     # Start dev server (nodemon)


## Frontend:

bash
npm run dev     # Start Vite dev server
npm run build   # Create production build


## ✨ Future Enhancements
🛡️ Role-based access control

⏰ Scheduled scraping (cron jobs)

📈 Data visualization charts

🔍 Advanced search/filtering

📤 CSV/Excel export

📜 License
MIT License - Open source

👨‍💻 Author
Jay Chinche - Full Stack Developer


