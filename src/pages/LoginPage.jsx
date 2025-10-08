import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login, putAccessToken, getUserLogged } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import useLoading from "../hooks/useLoading";

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);
  const { loading, withLoading } = useLoading();

  async function onLogin({ email, password }) {
    await withLoading(async () => {
      const { error, data } = await login({ email, password });

      if (!error) {
        putAccessToken(data.accessToken);

        const { data: user } = await getUserLogged();
        onLoginSuccess(user);

        navigate("/");
      }
    });
  }
  return (
    <section className="login-page">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <span>{locale === "id" ? "Memuat..." : "Loading..."}</span>
          </div>
        </div>
      )}

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
