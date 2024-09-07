import { useState } from "react";

import "./BookingTimeComponent.scss";

interface item {
  item: number;
  item2: number;
  costTime: any;
  setCostTime: (value: any) => void;
  end: string;
  start: string;
  setTrueDate: (value: any) => void;
  trueDate: any;
  day:any,
}
export default function BookingTimeComponent(item: item) {
  const [active, setActive] = useState("booking_time_component");

  function functionCostTime() {
    let newArr: number[] = item.costTime;
    if (active == "booking_time_component") {
      setActive("booking_time_component_active");
      newArr.push(item.item2);
    } else {
      setActive("booking_time_component");
      newArr = newArr.filter((newArr) => newArr !== item.item2);
    }
    item.setCostTime(newArr)
    if (item.trueDate.length == 0) {
      item.setTrueDate([item.day]);
    }
    let help = 0;
    item.trueDate.forEach((element:any) => {
      if (element == item.day) {
        help = 1;
      } else {
        return;
      }
    });
    if (help == 0) {
      newArr = item.trueDate;
      newArr.push(item.day);
      item.setTrueDate(newArr);
    }
  }

  return (
    <div onClick={functionCostTime} className={active}>
      <p>{item.item2}:00</p>
    </div>
  );
}
