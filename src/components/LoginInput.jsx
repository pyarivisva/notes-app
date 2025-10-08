import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function LoginInput({ onLogin }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className="input-login">
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
      <button type="submit">Masuk</button>
    </form>
  );
}

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;
