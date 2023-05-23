import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const cardnameRef = React.useRef("");
  const cardlinkRef = React.useRef("");

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: cardnameRef.current.value,
      link: cardlinkRef.current.value,
    });
  }

  React.useEffect(() => {
    cardnameRef.current.value = "";
    cardlinkRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      name="addCard"
      title="Новое место"
      buttonText="Создать"
    >
      <input
        ref={cardnameRef}
        type="text"
        id="cardname"
        name="name"
        className="popup__field popup__field_input_namecard"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__field-error nameCard-error"></span>
      <input
        ref={cardlinkRef}
        type="url"
        id="cardlink"
        name="link"
        className="popup__field popup__field_input_imagecard"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__field-error urlCard-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
