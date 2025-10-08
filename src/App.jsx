import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import AddPage from "./pages/AddPage";
import ArchivePage from "./pages/ArchivePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { FiHome, FiPlusCircle, FiArchive, FiLogOut } from "react-icons/fi";
import useAuth from "./hooks/useAuth";

function Layout({ authedUser, onLogout }) {
  return (
    <div className="app-container">
      <header>
        <h1>Note App</h1>
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/" title="Beranda">
                <FiHome />
              </Link>
            </li>
            <li>
              <Link to="/notes/new" title="Tambah Catatan">
                <FiPlusCircle />
              </Link>
            </li>
            <li>
              <Link to="/archives" title="Arsip">
                <FiArchive />
              </Link>
            </li>
            {authedUser && (
              <li>
                <button onClick={onLogout} title="Keluar">
                  <FiLogOut />
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}

function App() {
  const { authedUser, initializing, login, logout } = useAuth();

  if (initializing) {
    return <div>Loading...</div>;
  }
  // Jika belum login
  if (!authedUser) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage onLoginSuccess={login} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // Jika sudah login, tampilkan aplikasi utama
  return (
    <Routes>
      <Route element={<Layout authedUser={authedUser} onLogout={logout} />}>
        <Route index element={<HomePage />} />
        <Route path="/notes/new" element={<AddPage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
        <Route path="/archives" element={<ArchivePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
