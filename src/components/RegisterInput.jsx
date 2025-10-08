import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import LocaleContext from "../contexts/LocaleContext";

function RegisterInput({ onRegister }) {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");
  const { locale } = React.useContext(LocaleContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert(
        locale === "id"
          ? "Konfirmasi password tidak cocok"
          : "Password confirmation does not match"
      );
      return;
    }

    onRegister({ name, email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className="input-register">
      <input
        type="text"
        placeholder={locale === "id" ? "Nama" : "Name"}
        value={name}
        onChange={onNameChange}
        required
      />
      <input
        type="email"
        placeholder={locale === "id" ? "Email" : "Email"}
        value={email}
        onChange={onEmailChange}
        required
      />
      <input
        type="password"
        placeholder={locale === "id" ? "Kata Sandi" : "Password"}
        value={password}
        onChange={onPasswordChange}
        required
      />
      <input
        type="password"
        placeholder={
          locale === "id" ? "Konfirmasi Kata Sandi" : "Confirm Password"
        }
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
      />
      <button type="submit">{locale === "id" ? "Daftar" : "Register"}</button>
    </form>
  );
}

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
