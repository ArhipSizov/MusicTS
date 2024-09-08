import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../Services/store/Slice";
import { addUserDB } from "../../Services/fbUsers";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useSelector } from "react-redux";
import { userArrAdd } from "../../Common/userArrAdd";

import "./Register.scss";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [pasvord, setPasvord] = useState<string>("");
  const [name, setName] = useState<string>("Аноним");
  const [number, setNumber] = useState<string>("нету");
  const [showRegister1, setShowRegister1] = useState<boolean>(true);
  const [showRegister2, setShowRegister2] = useState<boolean>(false);

  const [type, setType] = useState<boolean>(true);
  const [input1, setInput1] = useState<string>("false");
  const [input2, setInput2] = useState<string>("false");
  const [input3, setInput3] = useState<string>("false");
  const [but, setBut] = useState<string>("none");
  const [error, setError] = useState<string>("none");
  const [butFalse, setButFalse] = useState<string>("butFalse");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addTask = () => dispatch(addUser({ email, pasvord, name, number }));

  function showRegisterFunction() {
    setShowRegister1(false);
    setShowRegister2(true);
  }

  const userArr = useSelector((state:any) => state.user.user);

  if (email == "") {
    userArrAdd(userArr, undefined, undefined, undefined, setEmail);
  }


  function getRegisterData(event:any) {
    event.preventDefault();
    const auth:any = getAuth();
    setTimeout(() => {
      setError("error");
    }, 2000);
    createUserWithEmailAndPassword(auth, email, pasvord).then(() => {
      updateProfile(auth.currentUser, {
        displayName: null,
        email: null,
      }).then(() => {
        navigate("/profile");
      });
    });
    addUserDB({ email, pasvord });
    addTask();
  }

  function conditionPassword() {
    setTimeout(() => {
      const passLenght:any = pasvord.match(/[a-z0-9A-Z]/g);
      if (pasvord.length < 8) {
        setInput1("false");
      } else {
        setInput1("none");
      }
      if (pasvord.match(/[A-Z]/g) == null || pasvord.match(/[a-z]/g) == null) {
        setInput2("false");
      } else {
        setInput2("none");
      }
      if (pasvord.length !== 0) {
        if (passLenght.length !== pasvord.length) {
          setInput3("none");
        } else {
          setInput3("false");
        }
      } else {
        setInput3("false");
      }
      conditionButton();
    }, 1);
  }
  function conditionButton() {
    if (input1 == "none" && input2 == "none" && input3 == "none") {
      setBut("but");
      setButFalse("none");
    } else {
      setBut("none");
      setButFalse("butFalse");
    }
  }
  return (
    <div>
      {showRegister1 && (
        <div className="register1">
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
            <p className="name">Регистрация</p>
            <p className="question">Введите e-mail</p>
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
            <p className="texst_link">
              {" "}
              Регистрируясь, вы соглашаетесь с нашими
              <NavLink className="link" to="/privacy">
                {" "}
                Условиями использования{" "}
              </NavLink>
              и даете согласие на обработку персональных данных
            </p>
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
            <form onSubmit={getRegisterData}>
              <p className="name">Придумайте пароль</p>
              <p className="question">
                Придумайте пароль для входа в приложение
              </p>
              <div className="input_all">
                <img className="img" src="/password.svg" alt="" />

                <input
                  onInput={conditionPassword()}
                  required
                  onChange={(e) => setPasvord(e.target.value)}
                  value={pasvord}
                  className="input"
                  type={type ? "password" : "text"}
                  placeholder="пароль"
                />

                <img
                  className="eye"
                  onClick={() => setType(!type)}
                  src={type ? "/eye.svg" : "/eye_open.svg"}
                  alt=""
                />
              </div>
              <div className="params">
                <p className={input1}>Не менее 9 символов</p>
                <p className={input2}>Строчные и заглавные буквы</p>
                <p className={input3}>Цифры и спецсимволы (#, &, ! и т. п.)</p>
              </div>
              <p className={error}>Пользователь уже зарегистрирован</p>
              <input className={but} type="submit" value="Подтвердить" />
              <div className={butFalse}>Подтвердить</div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
