import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import "./App.css";

function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />

      <div className="popup popup-edit">
        <div className="popup__container">
          <button
            aria-label="кнопка закрыть"
            type="button"
            className="popup__close-button"
          ></button>
          <h2 className="popup__title">Редактировать профиль</h2>
          <form
            action="#"
            name="popup-form"
            className="popup__form popup-edit__form"
            novalidate
          >
            <fieldset className="popup__input-container">
              <input
                required
                minlength="2"
                maxlength="40"
                autocomplete="off"
                name="name"
                type="text"
                value=""
                placeholder="Жак-Ив Кусто"
                className="popup__text popup__text_type_name"
              />
              <span className="popup__error" id="name-error"></span>
              <input
                required
                minlength="2"
                maxlength="200"
                autocomplete="off"
                name="description"
                type="text"
                value=""
                placeholder="Исследователь океана"
                className="popup__text popup__text_type_description"
              />
              <span className="popup__error" id="description-error"></span>
              <button
                type="submit"
                className="popup__submit popup__submit-button_disabled"
                disabled
              >
                Сохранить
              </button>
            </fieldset>
          </form>
        </div>
      </div>

      <div className="popup popup-image">
        <div className="popup__container">
          <button
            aria-label="кнопка закрыть"
            type="button"
            className="popup__close-button"
          ></button>
          <h2 className="popup__title">Новое место</h2>
          <form
            action="#"
            name="popup-form"
            className="popup__form popup-image__form"
          >
            <fieldset className="popup__input-container">
              <input
                required
                minlength="1"
                maxlength="30"
                autocomplete="off"
                name="title"
                type="text"
                value=""
                placeholder="Название"
                className="popup__text popup__text_type_title"
              />
              <span className="popup__error" id="title-error"></span>
              <input
                required
                autocomplete="off"
                name="link"
                type="url"
                value=""
                placeholder="Ссылка на картинку"
                className="popup__text popup__text_type_link"
              />
              <span class="popup__error" id="link-error"></span>
              <button
                type="submit"
                className="popup__submit popup__submit-button_disabled"
                disabled
              >
                Создать
              </button>
            </fieldset>
          </form>
        </div>
      </div>

      <div className="popup popup-photo">
        <div className="popup__photo-container">
          <button
            aria-label="кнопка закрыть"
            type="button"
            className="popup__close-button"
          ></button>
          <img
            className="popup__img"
            src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
            alt=""
          />
          <h2 className="popup__title-photo">Архыз</h2>
        </div>
      </div>

      <div className="popup popup-confirm">
        <div className="popup__container">
          <button
            aria-label="Закрыть подтверждение удаления карточки"
            type="button"
            className="popup__close-button"
          ></button>
          <h2 className="popup__title popup__title_confirm">Вы уверены?</h2>
          <div className="popup__confirm-wrap">
            <button type="submit" className="popup__submit-button">
              Да
            </button>
          </div>
        </div>
      </div>

      <div className="popup popup-avatar">
        <div className="popup__container">
          <button
            aria-label="Закрыть редактирование аватарки"
            type="button"
            className="popup__close-button"
          ></button>
          <h2 className="popup__title">Обновить аватар</h2>
          <form
            action="#"
            name="popup-form"
            className="popup__form popup-avatar__form"
            novalidate
          >
            <fieldset className="popup__input-container">
              <input
                required
                name="link"
                type="url"
                placeholder="Ссылка на картинку"
                className="popup__text popup__text_type_link"
                id="link-input"
              />
              <span className="popup__error" id="link-error"></span>
              <button
                type="submit"
                className="popup__submit popup__submit-button"
              >
                Сохранить
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
