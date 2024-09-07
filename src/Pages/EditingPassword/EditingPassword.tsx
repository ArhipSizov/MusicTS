import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

import "./EditingPassword.scss";

export default function EditingPassword() {
  const [p, setP] = useState<string>("none");
  
  const auth = getAuth();

  const user:any = auth.currentUser;

  const email = user.email;

  function sendPasswordResetEmailFunction() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setP("")
      })
  }
  return (
    <div className="editing_password">
      <h1 className="name">Изменение пароля</h1>
      <p>Вы уверены что хотите изменить пароль? Если да, нажмите кнопку ниже</p>
      <div onClick={() => sendPasswordResetEmailFunction()}>Изменить пароль</div>
      <p className={p} >Письмо для изменения пароля отправлено на вашу почту</p>
    </div>
  );
}
