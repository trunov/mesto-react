import React, { useEffect } from "react";
import Card from "./Card";
import { api } from "../api/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    const promises = [api.getUserInfo(), api.getInitialCards()];
    Promise.all(promises)
      .then((values) => {
        setupCards(values[1]);
      })

      .catch((err) => console.log(`Error ${err}`));

    function setupCards(cards) {
      setCards(
        cards.map((item) => ({
          id: item._id,
          link: item.link,
          name: item.name,
          owner: item.owner,
          likes: item.likes,
        }))
      );
    }
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="cards">
        <ul className="cards__container">
          {cards.map((item) => (
            <Card
              key={item.id}
              src={item.link}
              alt={item.alt}
              title={item.name}
              likes={item.likes}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
