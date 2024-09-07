import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Loading.scss";

export default function Loading() {
  const [br1, setBr1] = useState<string>("br1");
  const [br2, setBr2] = useState<string>("br2");
  const [br3, setBr3] = useState<string>("br3");
  const [br4, setBr4] = useState<string>("br4");
  const [br5, setBr5] = useState<string>("br5");
  const [br6, setBr6] = useState<string>("br6");
  const [br7, setBr7] = useState<string>("br7");
  const [name, setName] = useState<string>("name");
  
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setBr1("br1 anim11");
      setBr2("br2 anim21");
      setBr3("br3 anim31");
      setBr4("br4 anim41");
      setBr5("br5 anim51");
      setBr6("br6 anim61");
      setBr7("br7 anim71");
    }, 400);
    setTimeout(() => {
      setBr1("br1 anim12");
      setBr2("br2 anim22");
      setBr3("br3 anim32");
      setBr4("br4 anim42");
      setBr5("br5 anim52");
      setBr6("br6 anim62");
      setBr7("br7 anim72");
    }, 800);
    setTimeout(() => {
      setBr1("br1 anim13");
      setBr2("br2 anim23");
      setBr3("br3 anim33");
      setBr4("br4 anim43");
      setBr5("br5 anim53");
      setBr6("br6 anim63");
      setBr7("br7 anim73");
    }, 1200);
    setTimeout(() => {
      setBr1("br1 anim14");
      setBr2("br2 anim24");
      setBr3("br3 anim34");
      setBr4("br4 anim44");
      setBr5("br5 anim54");
      setBr6("br6 anim64");
      setBr7("br7 anim74");
    }, 1600);
    setTimeout(() => {
      setBr1("br1 anim15");
      setBr2("br2 anim25");
      setBr3("br3 anim35");
      setBr4("br4 anim45");
      setBr5("br5 anim55");
      setBr6("br6 anim65");
      setBr7("br7 anim75");
    }, 2000);
    setTimeout(() => {
      setBr1("br1 anim16");
      setBr2("br2 anim26");
      setBr3("br3 anim36");
      setBr4("br4 anim46");
      setBr5("br5 anim56");
      setBr6("br6 anim66");
      setBr7("br7 anim76");
    }, 2400);
    setTimeout(() => {
      setBr1("br1 anim17");
      setBr2("br2 anim27");
      setBr3("br3 anim37");
      setBr4("br4 anim47");
      setBr5("br5 anim57");
      setBr6("br6 anim67");
      setBr7("br7 anim77");
    }, 2800);
    setTimeout(() => {
      setName("name name_on");
    }, 3500);
    setTimeout(() => {
      if (window.location.pathname == "/loading") {
        navigate("/login");
      }
    }, 5500);
  }, []);
  return (
    <div className="loading">
      <div className="anim"></div>
      <div className="logo_anim">
        <div className={br1}></div>
        <div className={br2}></div>
        <div className={br3}></div>
        <div className={br4}></div>
        <div className={br5}></div>
        <div className={br6}></div>
        <div className={br7}></div>
      </div>
      <p className={name}>music guide</p>
    </div>
  );
}
