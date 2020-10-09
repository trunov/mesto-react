import React, { useEffect } from "react";
import Card from "./Card";
import api from "../api/Api";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    const promises = [api.getUserInfo(), api.getInitialCards()];
    Promise.all(promises)
      .then((values) => {
        setupUser(values[0]);
        setupCards(values[1]);
      })

      .catch((err) => console.log(`Error ${err}`));
    let currentUser;

    function setupUser(user) {
      setUserName(user.name);
      setUserDescription(user.about);
      setUserAvatar(user.avatar);
      currentUser = user;
    }

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
          style={{ backgroundImage: `url(${userAvatar})` }}
        ></div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__description">{userDescription}</p>
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
