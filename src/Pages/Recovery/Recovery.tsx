import { NavLink } from "react-router-dom";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useSelector } from "react-redux";

import "./Recovery.scss";

export default function Recovery() {
  const [email, setEmail] = useState<string>("");
  const [showRegister1, setShowRegister1] = useState<boolean>(true);
  const [showRegister2, setShowRegister2] = useState<boolean>(false);

  const [help, setHelp] = useState<number>(0);

  const userArr = useSelector((state:any) => state.user.user);

  userArr.forEach((element:any) => {
    if (help == 0) {
      setHelp(element.email);
      setEmail(element.email);
    }
  });

  const auth = getAuth();

  function showRegisterFunction() {
    setShowRegister1(false);
    setShowRegister2(true);
    sendPasswordResetEmail(auth, email);
  }
  return (
    <div>
      {showRegister1 && (
        <div className="recovery">
          <div className="hr_all">
            <NavLink to="/login">
              <img src="/back.svg" alt="" />
            </NavLink>
            <div className="hr_div">
              <hr className="hr_on" />
              <hr />
            </div>
          </div>
          <form onSubmit={showRegisterFunction} className="register_all">
            <p className="name">Восстановление пароля</p>
            <p className="question">Введите свой email</p>
            <div className="input_all">
              <img className="img" src="/e_mail.svg" alt="" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="input"
                type="email"
                placeholder="e-mail"
                required
              />
            </div>
            <input className="but" type="submit" value="Подтвердить" />
          </form>
        </div>
      )}

      {showRegister2 && (
        <div className="register2">
          <div className="hr_all">
            <NavLink to="/login">
              <img src="/back.svg" alt="" />
            </NavLink>
            <div className="hr_div">
              <hr className="hr_on" />
              <hr className="hr_on" />
            </div>
          </div>
          <div className="register_all">
            <form>
              <p className="name">
                На ваш email успешно отправлено письмо с дальнейшими
                инструкциями для смены пароля
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
