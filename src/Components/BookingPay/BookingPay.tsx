import { useState } from "react";
import { useSelector } from "react-redux";
import { ref, update } from "firebase/database";
import { database } from "../../Services/store/index";
import { NavLink } from "react-router-dom";

import "./BookingPay.scss";

interface item{
  cost:number,
  costTime:any,
  item:any,
  room: string,
  setShowPay:(value: boolean) => void;
  setTrueDate:(value: boolean) => void;
  trueDate:any,
}
export default function BookingPay(item:item) {
  console.log(item);
  
  
  const [key, setKey] = useState<string>("");
  const [card, setCard] = useState<string>("");

  const [showPayCard, setShowPayCard] = useState<boolean>();
  const userArr = useSelector((state:any) => state.user.user);
  if (key == "") {
    userArr.forEach((element:any) => {
      setKey(element.key);
      if (element.card !== undefined) {
        setCard(element.card);
      }
    });
  }

  function updateDatabase() {
    const updates:any = {};
    const trueRoom = eval("item.item.item.halls." + item.room + ".name")

    const postData = {
      time: item.costTime,
      date: item.trueDate,
      cost: item.cost,
      room: trueRoom,
      name: item.item.item.name,
      logo: item.item.item.logo,
      area: item.item.item.area,
      number: item.item.item.number,
    };
    updates["/users/" + key + "/rooms/" + item.item.item.name + item.trueDate] = postData;
    return update(ref(database), updates);
  }
  return (
    <div className="booking_pay">
      <div onClick={() => item.setShowPay(false)} className="nav">
        <img src="/backAlt.svg" alt="" />
        <h1>Оплата</h1>
      </div>
      <div className="basic">
        <img className="logo_img" src={item.item.item.logo} alt="" />
        <div>
          <h1>{item.item.item.name}</h1>
          <p>{item.item.item.area}</p>
        </div>
      </div>
      <p className="cost">Итоговая стоимость: {item.cost}р.</p>
      <div className="cost_time_end">
        <p>Дата:</p>
        {item.trueDate.map((item:any) => (
          <p>{item} число,</p>
        ))}
      </div>
      <div className="cost_time_end">
        <p>Время:</p>
        {item.costTime.map((item:any) => (
          <p>{item}:00,</p>
        ))}
      </div>
      <form onSubmit={() => updateDatabase()}>
        <form>
          <p className="booking_pay_choice_p">Способ оплаты:</p>
          <div className="booking_pay_choice">
            <input
              onClick={() => setShowPayCard(false)}
              type="radio"
              name="field1"
            />
            <p>Оплата на месте</p>
          </div>
          <div className="booking_pay_choice">
            <input
              onClick={() => setShowPayCard(true)}
              type="radio"
              name="field1"
            />
            <p>Оплата картой</p>
          </div>
        </form>
        {showPayCard && (
          <form>
            {Object.keys(card).map((item) => (
              <div className="booking_pay_card">
                <p>{item}</p>
                <input type="radio" name="field2" />
              </div>
            ))}
            <NavLink className="NavLink" to="/bank_card">
              + Добавить банковскую карточку
            </NavLink>
          </form>
        )}
        <input placeholder="Забронировать" className="button" type="submit" />
      </form>
    </div>
  );
}
