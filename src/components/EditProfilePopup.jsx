import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
    >
      <input
        onChange={handleNameChange}
        value={name || ""}
        type="text"
        id="username"
        name="username"
        className="popup__field popup__field_input_nickname"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__field-error nickName-error"></span>
      <input
        onChange={handleDescriptionChange}
        value={description || ""}
        type="text"
        id="about"
        name="about"
        className="popup__field popup__field_input_profession"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__field-error profession-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
