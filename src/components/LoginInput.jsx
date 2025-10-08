import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import LocaleContext from "../contexts/LocaleContext";

function LoginInput({ onLogin }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const { locale } = React.useContext(LocaleContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className="input-login">
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
      <button type="submit">{locale === "id" ? "Masuk" : "Login"}</button>
    </form>
  );
}

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;
