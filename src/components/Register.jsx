import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

function Register({ openInfoTooltip, onError, onEmailChange }) {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { password, email } = formValue;
    auth
      .register(password, email)
      .then(() => {
        onError(false);
        openInfoTooltip(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        onError(true);
        openInfoTooltip(true);
        console.log(err);
      });
  };

  return (
    <section className="form">
      <h1 className="form__title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="form__authentication">
        <input
          value={formValue.email}
          onChange={onEmailChange}
          type="email"
          name="email"
          placeholder="Email"
          className="form__input register__input_email"
        />
        <input
          value={formValue.password}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Пароль"
          className="form__input register__input_password"
        />
        <button type="submit" className="form__button-submit">
          Зарегистрироватся
        </button>
      </form>
      <Link to="/sign-in" className="form__link">
        {" "}
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}

export default Register;
