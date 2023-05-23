import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup-view ${card ? "popup_opened" : ""}`}>
      <div className="popup__view-container">
        <img
          className="popup__photo-view"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <h2 className="popup__title-view">{card ? card.name : ""}</h2>
        <button
          onClick={onClose}
          type="button"
          aria-label="закрыть"
          className="popup__close popup__close-view"
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
