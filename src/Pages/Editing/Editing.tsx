import { NavLink } from "react-router-dom";
import { ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { database } from "../../Services/store/index";
import { useState } from "react";
import { useSelector } from "react-redux";

import App from "../../Components/CroptImage/App";

import "./Editing.scss";

export default function Editing() {
  const [email, setEmail] = useState<string>("");
  const [pasvord, setPasvord] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [favorites, setFavorites] = useState<any[]>([]);
  const [card, setCard] = useState<any>({});

  const navigate = useNavigate();
  const userArr = useSelector((state:any) => state.user.user);
  if (email == "") {
    userArr.forEach((element:any) => {
      setName(element.name);
      setNumber(element.number);
      setKey(element.key);
      setEmail(element.email);
      setPasvord(element.password);
      if (element.favorites !== undefined) {
        setFavorites(element.favorites);
      }
      if (element.card !== undefined) {
        setCard(element.card);
      }
    });
  }

  function updateDatabase() {
    const updates:any = {};
    updates["/users/" + key] = null;

    const postData = {
      email: email,
      number: number,
      key: key,
      password: pasvord,
      name: name,
      favorites: favorites,
      card: card,
    };
    updates["/users/" + key] = postData;
    navigate("/profile");
    return update(ref(database), updates);
  }
  return (
    <div className="editing">
      <NavLink className="div" to="/profile">
        <img src="/backAlt.svg" alt="" />
        <h1>Редактирование профиля</h1>
      </NavLink>
      <form onSubmit={() => updateDatabase()}>
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder="Имя  и фамилия"
        />
        <input
          required
          value={number}
          onChange={(event) => setNumber(event.target.value)}
          type="text"
          placeholder="Номер телефона"
        />
        <input className="button" placeholder="Подтвердить" type="submit" />
      </form>
      <App></App>
    </div>
  );
}
