import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="register">
      <h1 className="register__title">Регистрация</h1>
      <form className="register__form">
        <input
          type="text"
          placeholder="Email"
          className="register__input register__input_email"
        />
        <input
          type="password"
          placeholder="Пароль"
          className="register__input register__input_password"
        />
        <button type="submit" className="register__button-submit">
          Зарегистрироватся
        </button>
      </form>
      <Link to="" className="register__link">
        {" "}
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}

export default Register;
