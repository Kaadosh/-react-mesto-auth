import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../img/logo/logo.svg";

function Header({ loggerIn, email, onSignOut }) {
  const location = useLocation();
  return (
    <div className="header">
      <div src={logo} className="header__logo" alt="логотип mesto" />
      {loggerIn ? <p className="header__email">{email}</p> : null}
      {loggerIn ? (
        <button onClick={onSignOut} className="header__link">
          Выйти
        </button>
      ) : (
        <>
          {location.pathname === "/sign-in" ? (
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          ) : (
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          )}
        </>
      )}
    </div>
  );
}

export default Header;
