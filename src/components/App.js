import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);

  function handleProfile() {
    setIsProfilePopupOpen(true);
  }

  function handlePlace() {
    setIsPlacePopupOpen(true);
  }

  function handleAvatar() {
    setIsAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsProfilePopupOpen(false);
    setIsPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleProfile}
        onAddPlace={handlePlace}
        onEditAvatar={handleAvatar}
      />
      <Footer />

      <PopupWithForm
        name={"edit"}
        title={"Редактировать профиль"}
        buttonTitle={"Сохранить"}
        isOpen={isProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          required
          minLength="2"
          maxLength="40"
          autoComplete="off"
          name="name"
          type="text"
          placeholder="Жак-Ив Кусто"
          className="popup__text popup__text_type_name"
        />
        <span className="popup__error" id="name-error"></span>
        <input
          required
          minLength="2"
          maxLength="200"
          autoComplete="off"
          name="description"
          type="text"
          placeholder="Исследователь океана"
          className="popup__text popup__text_type_description"
        />
        <span className="popup__error" id="description-error"></span>
      </PopupWithForm>

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

      <ImagePopup />
    </div>
  );
}

export default App;