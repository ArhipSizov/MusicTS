import { NavLink } from "react-router-dom";
import { useState } from "react";

import "./Settings.scss";

export default function Settings() {
  const [showText1, setShowText1] = useState<string>("none");
  const [showText2, setShowText2] = useState<string>("none");
  const [showText3, setShowText3] = useState<string>("none");
  const [showImg1, setShowImg1] = useState<string>("");
  const [showImg2, setShowImg2] = useState<string>("");
  const [showImg3, setShowImg3] = useState<string>("");

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
    <div className="settings">
      <NavLink className="div" to="/profile">
        <img src="/backAlt.svg" alt="" />
        <h1>Настройки профиля</h1>
      </NavLink>
      <div
        onClick={() => setShowText(showText1, setShowText1, setShowImg1)}
        className="more"
      >
        <p>Безопасность</p>
        <h3 className={showText1}>
          изменить <NavLink to="/editing_password">пароль</NavLink>
        </h3>
        <img className={showImg1} src="/backAlt.svg" alt="" />
      </div>
      <div
        onClick={() => setShowText(showText2, setShowText2, setShowImg2)}
        className="more"
      >
        <p>Политика конфиденциальности</p>
        <h3 className={showText2}>
          Мы собираем некоторые ваши данные, не разглашая их третьим лицам.
          Подробнее можете узнать <NavLink to="/privacy">тут</NavLink>
        </h3>
        <img className={showImg2} src="/backAlt.svg" alt="" />
      </div>
      <div
        onClick={() => setShowText(showText3, setShowText3, setShowImg3)}
        className="more"
      >
        <p>О приложении</p>
        <h3 className={showText3}>
          Это приложение предостовляет возможность связыватся с компаниями, за
          деятельность которых мы не несём ответственности. Подробнее можете
          узнать <NavLink to="/privacy">тут</NavLink>
        </h3>
        <img className={showImg3} src="/backAlt.svg" alt="" />
      </div>
    </div>
  );
}
