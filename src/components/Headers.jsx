import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../img/logo/logo.svg";

function Header({ loggedIn, email, onSignOut }) {
  const location = useLocation();
  return (
    <div className="header">
      <img src={logo} className="header__logo" alt="логотип mesto" />
      <div className="header__content">
        {loggedIn ? <p className="header__email">{email}</p> : null}
        {loggedIn ? (
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
    </div>
  );
}

export default Header;
