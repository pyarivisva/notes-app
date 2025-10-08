import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import AddPage from "./pages/AddPage";
import ArchivePage from "./pages/ArchivePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import useAuth from "./hooks/useAuth";
import ThemeContext, { ThemeProvider } from "./contexts/ThemeContext";
import LocaleContext, { LocaleProvider } from "./contexts/LocaleContext";

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AppContent />
      </LocaleProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { authedUser, initializing, login, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale } = useContext(LocaleContext);

  if (initializing) {
    return <div>{locale === "id" ? "Memuat..." : "Loading..."}</div>;
  }

  return (
    <>
      <Header
        authedUser={authedUser}
        onLogout={logout}
        theme={theme}
        toggleTheme={toggleTheme}
        locale={locale}
        toggleLocale={toggleLocale}
      />
      {!authedUser ? (
        <Routes>
          <Route path="/login" element={<LoginPage onLoginSuccess={login} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes/new" element={<AddPage />} />
          <Route path="/notes/:id" element={<NoteDetailPage />} />
          <Route path="/archives" element={<ArchivePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
