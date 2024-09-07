import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";

import "./Profile.scss";

export default function Profile() {
  const [user, setUser] = useState<any>({});
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");

  const auth = getAuth();
  const navigate = useNavigate();

  const storage = getStorage();

  const userArr = useSelector((state:any) => state.user.user);
  if (email == "") {
    userArr.forEach((element:any) => {
      setEmail(element.email);
      setName(element.name);
      setNumber(element.number);
    });
  }

  function signOutUser() {
    signOut(auth).then(() => {
      setUser({
        email: null,
      });
      navigate("/loading");
    });
  }

  useEffect(() => {
    setTimeout(() => {
      getDownloadURL(ref(storage, email))
        .then((url) => {
          const img:any = document.getElementById("img");
          img.setAttribute("src", url);
        })
    }, 1);
  }, []);
  return (
    <div className="profile">
      <div className="background"></div>
      <img id="img" className="user_img" src="/user.png" alt="" />
      <div className="all_profile">
        <div className="change">
          <NavLink to="/settings">
            <img src="/settings.svg" alt="" />
          </NavLink>
          <NavLink to="/editing">
            <img src="/change.svg" alt="" />
          </NavLink>
        </div>
        <div className="profile_data">
          <p className="name">{name}</p>
          <p className="number">{number}</p>
          <p className="email">{email}</p>
        </div>
        <div className="options">
          <NavLink className="div" to="/favorites">
            <img src="/heart_empty.svg" alt="" />
            <p>Избранное</p>
          </NavLink>
          <NavLink className="div" to="/bank_card">
            <img src="/card.svg" alt="" />
            <p>Платежные карты</p>
          </NavLink>
          <NavLink className="div" to="help">
            <img src="/question.svg" alt="" />
            <p>Помощь</p>
          </NavLink>
          <div onClick={signOutUser}>
            <img src="/exit.svg" alt="" />
            <p>Выйти из профиля</p>
          </div>
        </div>
      </div>
    </div>
  );
}
