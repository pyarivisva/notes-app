import React from "react";
import { Link } from "react-router-dom";
import { MdTranslate } from "react-icons/md";
import { FaMoon, FaSun } from "react-icons/fa";
import {
  FiHome,
  FiPlusCircle,
  FiArchive,
  FiLogOut,
  FiUser,
} from "react-icons/fi";

function Header({
  authedUser,
  onLogout,
  toggleTheme,
  toggleLocale,
  theme,
  locale,
}) {
  return (
    <header className="app-header">
      <h1 className="app-title">
        {locale === "id" ? "Aplikasi Catatan" : "Notes App"}
      </h1>

      <nav className="navigation">
        <ul>
          <li>
            <button
              className="btn-locale"
              onClick={toggleLocale}
              title={
                locale === "id"
                  ? "Ganti ke Bahasa Inggris"
                  : "Switch to Indonesian"
              }
            >
              <MdTranslate size={20} />
              <span className="btn-locale__text">
                {locale === "id" ? "EN" : "ID"}
              </span>
            </button>
          </li>

          <li>
            <button
              onClick={toggleTheme}
              title={
                theme === "light"
                  ? "Ganti ke Tema Gelap"
                  : "Ganti ke Tema Terang"
              }
              className="btn-theme"
            >
              {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
            </button>
          </li>

          {authedUser && (
            <>
              <li>
                <Link to="/" title={locale === "id" ? "Beranda" : "Home"}>
                  <FiHome />
                </Link>
              </li>

              <li>
                <Link
                  to="/notes/new"
                  title={locale === "id" ? "Tambah Catatan" : "Add Note"}
                >
                  <FiPlusCircle />
                </Link>
              </li>

              <li>
                <Link
                  to="/archives"
                  title={locale === "id" ? "Arsip" : "Archives"}
                >
                  <FiArchive />
                </Link>
              </li>

              <li>
                {authedUser && (
                  <div className="user-info">
                    <div className="avatar-icon">
                      <FiUser />
                    </div>
                    <span className="user-name">
                      {locale === "id"
                        ? `Hai, ${authedUser.name}`
                        : `Hello, ${authedUser.name}`}
                    </span>
                    <button
                      className="btn-logout"
                      onClick={onLogout}
                      title="Keluar"
                    >
                      <FiLogOut />
                    </button>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
