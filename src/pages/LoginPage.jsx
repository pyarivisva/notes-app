import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login, putAccessToken, getUserLogged } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);

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
      <div className="login-box">
        <h2>{locale === "id" ? "Masuk" : "Login"}</h2>
        <LoginInput onLogin={onLogin} />
        <p>
          {locale === "id" ? "Belum punya akun? " : "Don't have an account? "}
          <Link to="/register">
            {locale === "id" ? "Daftar di sini" : "Register here"}
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
