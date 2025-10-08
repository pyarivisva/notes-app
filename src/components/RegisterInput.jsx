import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function RegisterInput({ onRegister }) {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Konfirmasi password tidak cocok");
      return;
    }

    onRegister({ name, email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className="input-register">
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={onNameChange}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        required
      />
      <input
        type="password"
        placeholder="Konfirmasi Password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
      />
      <button type="submit">Daftar</button>
    </form>
  );
}

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
