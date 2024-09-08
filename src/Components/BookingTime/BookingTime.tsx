import { useEffect, useState } from "react";

import BookingTimeComponent from "../BookingTimeComponent/BookingTimeComponent";

import "./BookingTime.scss";

interface item {
  item: number;
  costTime: any;
  setCostTime: (value: any) => void;
  end: string;
  start: string;
  setTrueDate: (value: any) => void;
  trueDate: any;
}
export default function BookingTime(item: item) {
  const [time, setTime] = useState<any>([]);
  const [showTime, setShowTime] = useState<boolean>(false);

  const newDate:any = new Date();
  const [date, setDate] = useState<number>();
  const [month] = useState(newDate.getMonth());
  

  function editTime() {
    if (newDate.getMonth() == month) {
      let newArr: number[] = time;
      if (newDate.getDate() <= +item.end) {
        newArr.push(newDate.getDate());
      }
      setTime(newArr);
      newDate.setDate(newDate.getDate() + 1);
      editTime();
    } else {
      setShowTime(true);
    }
  }

  useEffect(() => {
    if (item.item < 10) item = item;

    setDate(item.item);

    newDate.setDate(+item.start);
    editTime();
  }, []);
  return (
    <div className="booking_time">
      <p className="data">{date} число</p>
      {showTime &&
        time.map((item2:any) => (
          <BookingTimeComponent
            item2={item2}
            {...item}
            key={item2.id}
            costTime={item.costTime}
            setCostTime={item.setCostTime}
            setTrueDate={item.setTrueDate}
            day={item.item}
            trueDate={item.trueDate}
          ></BookingTimeComponent>
        ))}
    </div>
  );
}
