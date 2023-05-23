import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo/logo.svg";

function Header() {
  return (
    <div className="header">
      <div src={logo} className="header__logo" alt="логотип mesto" />
      <p className="header__email">email@email.ru</p>
      <Link to="" className="header__link">
        Выйти
      </Link>
    </div>
  );
}

export default Header;
