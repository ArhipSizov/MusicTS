import { useState } from "react";
import { useSelector } from "react-redux";

import "./MassageComponent.scss";

export default function MassageComponent(item:any) {
  const [trueEmail, setTrueEmail] = useState<string>("");
  const [classMassage, setClassMassage] = useState<string>("");
  const [userEmail, setUserEmail] = useState<boolean>(true);

  const userArr = useSelector((state:any) => state.user.user);
  
  if (trueEmail == "") {
    userArr.forEach((element:any) => {
      setTrueEmail(element.email);
    });
  } else if (classMassage == "") {
    if (trueEmail == item.email) {
      setClassMassage("massage_component");
      setUserEmail(false)
    } else {
      setClassMassage("massage_component_alt");
    }
  }
  return (
    <div className={classMassage}>
      {userEmail && <p className="email">{item.email}</p>}
      <p>{item.coment}</p>
      <p className="time">{item.time}</p>
    </div>
  );
}
