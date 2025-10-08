import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/network-data";

function RegisterPage() {
  const navigate = useNavigate();

  async function onRegister({ name, email, password }) {
    const { error } = await register({ name, email, password });

    if (!error) {
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    }
  }

  return (
    <section className="register-page">
      <h2>Daftar</h2>
      <RegisterInput onRegister={onRegister} />
      <p>
        Sudah punya akun? <Link to="/login">Masuk di sini</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
