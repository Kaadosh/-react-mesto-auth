import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef("");

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
    >
      <input
        ref={avatarRef}
        type="url"
        id="avatarlink"
        name="avatarlink"
        className="popup__field popup__field_avatar_input"
        placeholder="Ссылка на аватарку"
        required
      />
      <span className="popup__field-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
