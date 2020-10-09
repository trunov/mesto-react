import React from "react";

function Main() {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar"></div>
        <div className="profile__info">
          <h1 className="profile__name"></h1>
          <button className="profile__edit-button" type="button"></button>
          <p className="profile__description"></p>
        </div>
        <button className="profile__add-button" type="button"></button>
      </section>

      <section className="cards">
        <ul className="cards__container"></ul>
      </section>
    </main>
  );
}

export default Main;
