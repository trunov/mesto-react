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

  function closeHandleProfile() {
    setIsProfilePopupOpen(false);
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
        onClose={closeHandleProfile}
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

      <ImagePopup />
    </div>
  );
}

export default App;
