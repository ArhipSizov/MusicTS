import { useState } from "react";
import { useSelector } from "react-redux";
import { userArrAdd } from "../../Common/userArrAdd";

import OrdersComponent from "../../Components/OrdersComponent/OrdersComponent";

import "./Orders.scss";

export default function Orders() {
  const [active1, setActive1] = useState<string>("active");
  const [active2, setActive2] = useState<string>("");

  const [showOrder, setShowOrder] = useState<boolean>(true);

  const [key, setKey] = useState<string>("");
  const [rooms, setRooms] = useState<any[]>([]);

  const userArr = useSelector((state:any) => state.user.user);
  if (key == "") {
    userArrAdd(
      userArr,
      undefined,
      undefined,
      setKey,
      undefined,
      undefined,
      undefined,
      undefined,
      setRooms
    )
  }

  function showOrderFunction(num:number) {
    if (num == 1) {
      setActive1("active");
      setActive2("");
      setShowOrder(true)
    } else {
      setActive1("");
      setActive2("active");
      setShowOrder(false)
    }
  }
  return (
    <div className="orders">
      <div className="nav">
        <h1>Заказы</h1>
        <div className="choose_orders">
          <p className={active1} onClick={() => showOrderFunction(1)}>
            Планируемые
          </p>
          <p className={active2} onClick={() => showOrderFunction(2)}>
            Прошедшие
          </p>
        </div>
      </div>
      {showOrder && (
        <div className="OrdersComponent_all">
          {Object.values(rooms).map((item) => (
            <OrdersComponent
              item={item}
              {...item}
              key={item.name}
            ></OrdersComponent>
          ))}
        </div>
      )}
    </div>
  );
}
