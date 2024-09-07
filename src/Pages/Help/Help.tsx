import { NavLink } from "react-router-dom";
import { useState } from "react";

import "./Help.scss";

export default function Help() {
  const [showText1, setShowText1] = useState<string>("none");
  const [showText2, setShowText2] = useState<string>("none");
  const [showText3, setShowText3] = useState<string>("none");
  const [showText4, setShowText4] = useState<string>("none");
  
  const [showImg1, setShowImg1] = useState<string>("");
  const [showImg2, setShowImg2] = useState<string>("");
  const [showImg3, setShowImg3] = useState<string>("");
  const [showImg4, setShowImg4] = useState<string>("");

  function setShowText(showText:string, setShowText:any, setShowImg:any) {
    if (showText == "none") {
      setShowText("");
      setShowImg("img_on");
    } else {
      setShowText("none");
      setShowImg("");
    }
  }

  return (
    <div className="help">
      <NavLink className="div" to="/profile">
        <img src="/backAlt.svg" alt="" />
        <h1>Помощь</h1>
      </NavLink>
      <h2>Часто задаваемые вопросы</h2>
      <div
        onClick={() => setShowText(showText1, setShowText1, setShowImg1)}
        className="fast"
      >
        <p>Как оплатить заказ?</p>
        <h3 className={showText1}>
          Оплатить заказ можно с помощью кнопки "Забронировать" в оплате студии
        </h3>
        <img className={showImg1} src="/backAlt.svg" alt="" />
      </div>
      <div
        onClick={() => setShowText(showText2, setShowText2, setShowImg2)}
        className="fast"
      >
        <p>Не приходит письмо для подтверждения почты</p>
        <h3 className={showText2}>
          Если не приходит письмо для подтверждения почты, то стоит проверить
          правильное написание почты или попробовать позже
        </h3>
        <img className={showImg2} src="/backAlt.svg" alt="" />
      </div>
      <div
        onClick={() => setShowText(showText3, setShowText3, setShowImg3)}
        className="fast"
      >
        <p>Как отменить заказ?</p>
        <h3 className={showText3}>
          Отменить заказ можно при помощи кнопки в меню «Заказы» или связавшись
          непосредственно с площадкой.
        </h3>
        <img className={showImg3} src="/backAlt.svg" alt="" />
      </div>
      <div
        onClick={() => setShowText(showText4, setShowText4, setShowImg4)}
        className="fast"
      >
        <p>Можно ли изменить время заказа?</p>
        <h3 className={showText4}>
          Время заказа изменить нельзя, но вы можете отменить заказ и
          забронировать на другое время
        </h3>
        <img className={showImg4} src="/backAlt.svg" alt="" />
      </div>
    </div>
  );
}
