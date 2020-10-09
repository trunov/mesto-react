import React from "react";

function ImagePopup() {
  return (
    <div className="popup popup-photo">
      <div className="popup__photo-container">
        <button aria-label="кнопка закрыть" type="button" className="popup__close-button"></button>
        <img className="popup__img" src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg" alt="" />
        <h2 className="popup__title-photo">Архыз</h2>
      </div>
    </div>
    
  );
}

export default ImagePopup;