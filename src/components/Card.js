import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ src, alt, title, likes, onCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick({ link: src, name: title });
  }

  return (
    <li className="cards__element">
      <img
        className="cards__element-img"
        src={src}
        alt={alt}
        onClick={handleClick}
      />
      <button
        className="cards__element-remove"
        type="button"
        title="Удалить"
      ></button>
      <div className="cards__description">
        <h2 className="cards__element-title">{title}</h2>
        <div className="cards__element-wrap">
          <button
            className="cards__element-button"
            type="button"
            title="Нравится"
          ></button>
          <p className="cards__element-like">{likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
