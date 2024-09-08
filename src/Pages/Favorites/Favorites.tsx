import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { userArrAdd } from "../../Common/userArrAdd";

import MiniBlock from "../../Components/MiniBlock/MiniBlock";
import arrCompanies from "../../../companies.json";

import "./Favorites.scss";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [key, setKey] = useState("");

    const companies = Object.values(arrCompanies);

    const userArr = useSelector((state:any) => state.user.user);
    if (key == "") {
      userArrAdd(
        userArr,
        undefined,
        undefined,
        setKey,
        undefined,
        undefined,
        setFavorites
      )
    }
  return (
    <div className="favorites">
      <div className="nav">
        <NavLink to="/profile">
          <img src="/backAlt.svg" alt="" />
          <h1>Избранное</h1>
        </NavLink>
      </div>
      <div>
      {companies.map((item) => (
        <MiniBlock
          item={item}
          {...item}
          key={item.id}
          classBlock="favorites"
          favorites={favorites}
          setFavorites={setFavorites}
          keyFavorites={key}
        ></MiniBlock>
      ))}
      </div>
    </div>
  );
}
