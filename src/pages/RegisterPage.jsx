import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import useLoading from "../hooks/useLoading";

function RegisterPage() {
  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);
  const { loading, withLoading } = useLoading();

  async function onRegister({ name, email, password }) {
    await withLoading(async () => {
      const { error } = await register({ name, email, password });

      if (!error) {
        alert(
          locale === "id"
            ? "Registrasi berhasil! Silakan login."
            : "Registration successful! Please login."
        );
        navigate("/login");
      }
    });
  }

  return (
    <section className="register-page">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <span>{locale === "id" ? "Memuat..." : "Loading..."}</span>
          </div>
        </div>
      )}

      <div className="register-box">
        <h2>{locale === "id" ? "Daftar" : "Register"}</h2>
        <RegisterInput onRegister={onRegister} />
        <p>
          {locale === "id" ? "Sudah punya akun?" : "Already have an account?"}{" "}
          <Link to="/login">
            {locale === "id" ? "Masuk di sini" : "Login here"}
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
