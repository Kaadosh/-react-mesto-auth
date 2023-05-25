import React from "react";
import Header from "./Headers";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import { useEffect } from "react";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((el) => (el._id === card._id ? newCard : el))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userData) {
    api
      .editUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(cardId) {
    api
      .removeCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((el) => el._id !== cardId));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(userData) {
    api
      .editAvatar(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .postCards(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsTooltipOpen(false);
    setSelectedCard(null);
  }

  function signOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/sign-in");
  }

  function handleLogin() {
    setLoggedIn(true);
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка:${err}`);
      });
  }, []);
  React.useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={email} onSignOut={signOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                render={(props) => (
                  <Main
                    cards={cards}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    handleCardLike={handleCardLike}
                    handleCardDelete={handleCardDelete}
                    {...props}
                  />
                )}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                openInfoTooltip={setIsTooltipOpen}
                onError={setIsError}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                openInfoTooltip={setIsTooltipOpen}
                onError={setIsError}
                handleLogin={handleLogin}
              />
            }
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          isOpen={isTooltipOpen}
          isError={isError}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
        ></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
