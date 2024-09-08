import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { database } from "../../Services/store/index";
import { userArrAdd } from "../../Common/userArrAdd";


import BankCardComponent from "../../Components/BankCardComponent/BankCardComponent";

import "./BankCard.scss";

export default function BankCard() {
  const navigate = useNavigate();

  const [error, setError] = useState<boolean>(true);

  const [number, setNumber] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [CVV, setCVV] = useState<string>("");

  const [key, setKey] = useState<string>("");
  const [card, setCard] = useState<any>({});

  const userArr = useSelector((state:any) => state.user.user);
  if (key == "") {
    userArrAdd(
      userArr,
      undefined,
      setNumber,
      setKey,
      undefined,
      undefined,
      undefined,
      setCard
    )
  }

  function updateDatabase() {
    const updates:any = {};

    const postData = {
      number: number,
      date: date,
      CVV: CVV,
    };
    updates["/users/" + key + "/card/" + number] = postData;
    navigate("/profile");
    return update(ref(database), updates);
  }

  useEffect(() => {
    setError(true);
    if (number.length == 16) {
      setError(true);
      if (date.length == 5) {
        setError(true);
        if (CVV.length == 3) {
          setError(false);
        }
      }
    }
  }, [number, date, CVV]);
  return (
    <div className="bank_card">
      <NavLink className="div" to="/profile">
        <img src="/backAlt.svg" alt="" />
        <h1>Банковская карта</h1>
      </NavLink>
      <form onSubmit={() => updateDatabase()} className="bank_card_add">
        <input
          value={number}
          onChange={(event) => setNumber(event.target.value)}
          placeholder="Номер карточки"
          type="number"
        />
        <div>
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
            placeholder="Дата"
            type="text"
          />
          <input
            value={CVV}
            onChange={(event) => setCVV(event.target.value)}
            placeholder="CVV"
            type="number"
          />
        </div>
        {error && <p className="error">Неверные данные</p>}
        {!error && (
          <input placeholder="Добавить" className="button" type="submit" />
        )}
      </form>
      {Object.values(card).map((item:any) => (
        <BankCardComponent
          item={item}
          {...item}
          key={item.number}
        ></BankCardComponent>
      ))}
    </div>
  );
}
