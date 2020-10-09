import React, {useEffect} from "react";
import api from "../api/Api";

function Main({ onEditProfile, onAddPlace, onEditAvatar }) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  
  useEffect(() => {
    const promises = [api.getUserInfo(), api.getInitialCards()];
    Promise.all(promises).then((values) => {
      setupUser(values[0]);
    })
    
    .catch((err) => console.log(`Error ${err}`));
    let currentUser;

    function setupUser(user) {
      setUserName(user.name);
      setUserDescription(user.about);
      setUserAvatar(user.avatar);
      currentUser = user;
    }
  });

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }}></div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="cards">
        <ul className="cards__container"></ul>
      </section>
    </main>
  );
}

export default Main;
