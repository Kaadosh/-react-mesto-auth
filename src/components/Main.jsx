import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  handleCardLike,
  handleCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <div className="main">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <div
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            className="profile__img"
            alt={currentUser.name}
          />
          <button
            onClick={onEditAvatar}
            className="profile__button-avatar"
            type="button"
            title="Изменить аватар"
          ></button>
        </div>

        <div className="profile__info">
          <div className="profile__info-name">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className="profile__button"
              type="button"
              aria-label="Редактировать"
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>

        <button
          onClick={onAddPlace}
          className="profile__add"
          type="button"
          aria-label="Добавить фото"
        ></button>
      </section>

      <section className="cards">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        ))}
      </section>
    </div>
  );
}

export default Main;
