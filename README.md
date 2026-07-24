# RenewCred CMS

A full-stack Content Management System (CMS) and public website for RenewCred. Built with Next.js, Redux Toolkit, Express, MongoDB, and Docker.

---

## 📌 Features

- **Admin Auth**: Simple JWT-based login and logout.
- **Admin Dashboard**: Overview of website sections, active statuses, and update timestamps.
- **Dynamic CMS Editor**: Edit page content live without rebuilding or redeploying.
- **Rich Blocks**: Supports paragraphs, lists, tables, markdown, and LaTeX math equations.
- **Public Site**: Consumes backend APIs dynamically via Redux Toolkit.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 16 (App Router), Redux Toolkit, Lucide Icons, Vanilla CSS
- **Backend**: Express.js, JWT, Mongoose
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose

---

## ⚡ Quick Start

### 1. Run Backend

```bash
cd backend
npm install
npm run seed  # Seeds default admin & initial section data
npm run dev   # Runs on http://localhost:5000
```

### 2. Run Next.js App

```bash
cd next-app
npm install
npm run dev   # Runs on http://localhost:3000
```

### 3. Docker (Optional)

```bash
docker-compose up --build
```

---

## 🔐 Admin Credentials

- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@renewcred.com`
- **Password**: `admin123`

---

## 🔌 API Endpoints

- `POST /api/auth/login` - Admin login
- `GET /api/content` - Fetch all sections
- `GET /api/content/:section` - Fetch single section
- `PUT /api/content/:section` - Update section (Protected)

---

## 💡 Architecture Decisions

- **Single Next.js App**: Unified public pages (`/`) and admin portal (`/admin`) in one app for simpler routing and setup.
- **Redux vs Local State**: Global user auth and API content sit in Redux Toolkit; form inputs and UI toggles use local component state.
- **JSON + Blocks**: Flexible block schema handles simple fields alongside rich markdown and math formulas.

---

## 📄 Environment Variables (`.env.example`)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/renewcred_cms
JWT_SECRET=renewcred_jwt_super_secret_key_2026
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
