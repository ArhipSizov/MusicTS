import { useEffect, useState } from "react";

import "./BookingRoom.scss";

export default function BookingRoom(item: any) {
  const [active, setActive] = useState<string>("booking_room");

  useEffect(() => {
    if (item.trueName == item.room) {
      setActive("booking_room booking_room_active");
      item.setCostRoom(item.cost);
    } else {
      setActive("booking_room");
    }
  }, [item.room]);

  return (
    <div
      onClick={() => {
        item.setRoom(item.trueName);
      }}
      className={active}
    >
      <img className="photo" src={item.photo} alt="" />
      <p>{item.name}</p>
      <div>
        <img src="/room_company.svg" alt="" />
        <p>{item.square} м2</p>
      </div>
    </div>
  );
}
