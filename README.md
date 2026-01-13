# 📝 Notes App

A modern **Notes Application Frontend** built with **React.js**, consuming the official **Dicoding Notes API** for authentication and notes management.

This repository contains **frontend-only implementation**.

---

## 🚀 Tech Stack

- **React.js**
- **React Hooks**
- **Context API**
- **Custom Hooks**
- **Fetch API**
- **CSS / Modular Styling**

---

## 🌐 API Integration

This application uses the **Dicoding Notes API**:

https://notes-api.dicoding.dev/v1


The access token is stored in **localStorage**.

---

## 🔐 Authentication Flow

1. User logs in via `/login`
2. API returns an `accessToken`
3. Token is stored in `localStorage`
4. All protected requests attach the token automatically

---

## 🧪 API Endpoints Used

### Authentication

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/login` | User login |
| POST | `/register` | User registration |
| GET | `/users/me` | Get logged-in user data |

---

### Notes

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/notes` | Get active notes |
| GET | `/notes/archived` | Get archived notes |
| GET | `/notes/{id}` | Get note details |
| POST | `/notes` | Create a new note |
| POST | `/notes/{id}/archive` | Archive a note |
| POST | `/notes/{id}/unarchive` | Unarchive a note |
| DELETE | `/notes/{id}` | Delete a note |

---

## ✨ Features

- User authentication (login & register)
- Access token-based authentication
- Create, read, archive, unarchive, and delete notes
- Active & archived notes separation
- Global state management using Context API
- Clean architecture using custom hooks
- Reusable and modular components
- Responsive user interface

---

## 📁 Project Structure

```bash
src/
├── components/     # Reusable UI components
├── contexts/       # Global state management
├── hooks/          # Custom React hooks
├── pages/          # Application pages
├── styles/         # Styling files
├── utils/          # Helper & API utilities
├── App.jsx         # Main application component
├── index.jsx       # Entry point
