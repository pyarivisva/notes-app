import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login, putAccessToken, getUserLogged } from "../utils/network-data";

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      // Simpan token ke localStorage
      putAccessToken(data.accessToken);

      // Ambil data user
      const { data: user } = await getUserLogged();
      onLoginSuccess(user);

      navigate("/"); // kembali ke home
    }
  }

  return (
    <section className="login-page">
      <h2>Masuk</h2>
      <LoginInput onLogin={onLogin} />
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </section>
  );
}

export default LoginPage;
