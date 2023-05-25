import React from "react";
import icon from "../img/icon.svg";
import union from "../img/Union.svg";

function InfoTooltip({ isOpen, isError }) {
  return (
    <section className={`popup popup__tooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container-tooltip">
        <img
          src={isError ? union : icon}
          className="popup__icon"
          alt="иконка успешной регистрации"
        />
        <h2 className="popup__title popup__title-tooltip">
          {isError
            ? `Что-то пошло не так! Попробуй еще раз.`
            : `Вы успешно зарегистрировались!`}
        </h2>
        <button type="button" className="popup__close"></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
