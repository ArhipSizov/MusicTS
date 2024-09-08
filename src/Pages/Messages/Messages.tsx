import { collection, setDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../../main";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userArrAdd } from "../../Common/userArrAdd";

import MassageComponent from "../../Components/MassageComponent/MassageComponent";

import "./Messages.scss";

export default function Messages() {
  const [coment, setComent] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [dbArr, setDbArr] = useState<any[]>([]);
  const [email, setEmail] = useState<string>("");

  const userArr = useSelector((state:any) => state.user.user);
  setTimeout(() => {
    userArrAdd(
      userArr,
      undefined,
      undefined,
      undefined,
      setEmail
    )
  }, 1500);
  async function addDocFunction() {
    if (coment !== "" && email !== "") {
      const now = new Date();
      const num = String(dbArr.length);
      let time = ""
      if (now.getMinutes() < 10) {
        time = now.getHours() + ":0" + now.getMinutes();
      }else{
        time = now.getHours() + ":" + now.getMinutes();
      }
      try {
        // const docRef = 
        await setDoc(doc(db, "coments", num), {
          email: email,
          coment: coment,
          time: time,
          id: num,
        });
        location.reload();
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function getDocFunction() {
    const querySnapshot = await getDocs(collection(db, "coments"));
    querySnapshot.forEach((doc) => {
      let newArr = dbArr;
      newArr.push(doc.data());
      setDbArr(newArr);
    });
    setShow(true);
  }

  if (dbArr.length == 0) {
    getDocFunction();
  }

  return (
    <div className="messages">
      <div className="nav">
        <h1>Сообщения</h1>
      </div>
      <div className="messages_footer">
        <textarea
          placeholder="Сообщение"
          onChange={(event) => setComent(event.target.value)}
          name="comment"
          // cols={40}
          // rows={3}
        ></textarea>
        <img onClick={() => addDocFunction()} src="/send.svg" alt="" />
      </div>
      {show &&
        dbArr.map((item) => <MassageComponent {...item} key={item.id} />)}
    </div>
  );
}
