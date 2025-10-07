import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NoteDetail from "./pages/NoteDetail";
import AddPage from "./pages/AddPage";
import ArchivePage from "./pages/ArchivePage";
import NotFoundPage from "./pages/NotFoundPage";
import { FiHome, FiPlusCircle, FiArchive } from "react-icons/fi";

function App() {
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

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes/new" element={<AddPage />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
        <Route path="/archives" element={<ArchivePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
