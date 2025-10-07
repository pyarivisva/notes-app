import React from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import AddPage from "./pages/AddPage";
import ArchivePage from "./pages/ArchivePage";
import NotFoundPage from "./pages/NotFoundPage";
import { FiHome, FiPlusCircle, FiArchive } from "react-icons/fi";

function Layout() {
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
          </ul>
        </nav>
      </header>

      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
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
