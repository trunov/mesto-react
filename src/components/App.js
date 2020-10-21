import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import { api } from "../api/Api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });

  const [currentUser, setCurrentUser] = React.useState({});

  function handleProfile() {
    setIsProfilePopupOpen(true);
  }

  function handlePlace() {
    setIsPlacePopupOpen(true);
  }

  function handleAvatar() {
    setIsAvatarPopupOpen(true);
  }

  function handleCard(card) {
    setSelectedCard({
      isOpen: true,
      link: card.link,
      title: card.name,
      alt: card.alt,
    });
  }

  function handleUpdateUser({ name, description }) {
    api
      .editProfile({ name, description })
      .then((result) => { 
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function closeAllPopups() {
    setIsProfilePopupOpen(false);
    setIsPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setSelectedCard({ isOpen: false });
  }

  React.useEffect(() => {
    const promises = [api.getUserInfo(), api.getInitialCards()];

    Promise.all(promises)
      .then((results) => {
        setCurrentUser(results[0]);
      })
      .catch((err) => console.log(`Error ${err}`));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleProfile}
          onAddPlace={handlePlace}
          onEditAvatar={handleAvatar}
          onCardClick={handleCard}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupWithForm
          name={"image"}
          title={"Новое место"}
          buttonTitle={"Сохранить"}
          isOpen={isPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            required
            minLength="1"
            maxLength="30"
            autoComplete="off"
            name="title"
            type="text"
            placeholder="Название"
            className="popup__text popup__text_type_title"
          />
          <span className="popup__error" id="title-error"></span>
          <input
            required
            autoComplete="off"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__text popup__text_type_link"
          />
          <span className="popup__error" id="link-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name={"avatar"}
          title={"Обновить аватар"}
          buttonTitle={"Сохранить"}
          isOpen={isAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            required
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__text popup__text_type_link"
            id="link-input"
          />
          <span className="popup__error" id="link-error"></span>
        </PopupWithForm>

        <ImagePopup
          link={selectedCard.link}
          title={selectedCard.title}
          isOpen={selectedCard.isOpen}
          alt={selectedCard.alt}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
