import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { api } from "../api/Api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

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

  function setupCards(cards) {
    setCards(
      cards.map((item) => ({
        _id: item._id,
        link: item.link,
        name: item.name,
        owner: item.owner,
        likes: item.likes,
      }))
    );
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

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));

        setCards(newCards);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);

        setCards(newCards);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function handleUpdateAvatar({ link }) {
    api
      .editAvatar({ link })
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]); 
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
        setupCards(results[1]);
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
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

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
