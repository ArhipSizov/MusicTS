import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import Booking from "../Booking/Booking";

import "./FullBlock.scss";

export default function FullBlock(item:any) {
 
  const [showBookingBlock, setShowBookingBlock] = useState<boolean>(false);
  const [favoritesNum, setFavoritesNum] = useState<number>(0);

  let data = null;
  const database = getDatabase();
  const starCountRef = ref(database);
  onValue(starCountRef, (snapshot) => {
    data = snapshot.val();
  });

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      data = snapshot.val();
      const dataArr = Object.values(data.users);
      let favoritesHelpNum = 0;
      dataArr.forEach(function (item2:any) {
        if (item2.favorites !== undefined) {
          item2.favorites.forEach(function (item3:string) {
            if (item.name == item3) {
              favoritesHelpNum = favoritesHelpNum + 1;
            }
          });
        }
      });
      setFavoritesNum(favoritesHelpNum);
    });
  }, []);

  return (
    <div className="full_block">
      {showBookingBlock && (
        <div className="full_block_all">
          <Booking item={item} setShowBookingBlock={setShowBookingBlock} />
        </div>
      )}
      <div onClick={() => setShowBookingBlock(true)} className="button">
        Заказать
      </div>
      <div className="nav">
        <img onClick={() => item.setShowBlock(false)} src="/backAlt.svg" alt="" />
      </div>
      <img className="photo" src={item.photo} alt="" />
      <div className="body">
        <div className="top_information">
          <img className="logo_img" src={item.logo} alt="" />
          <div className="top_information_no_img">
            <p className="name">{item.name}</p>
            <p></p>
            <p>{item.area}</p>
            <div>
              <p className="p_alt">4,8</p>
              <img src="star_full.svg" alt="" />
            </div>
            <p>Площадь: {item.square}м2</p>
            <div>
              <p>{favoritesNum}</p>
              <img src="/heart.svg" alt="" />
            </div>
          </div>
        </div>
        <div>
          <h2>Описание</h2>
          <p>{item.description}</p>
        </div>
        <div>
          <h2>Услуги</h2>
          <div className="list">
            {item.services.map((item:string) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
        <div>
          <h2>Удобства</h2>
          <div className="list">
            {item.facilities.map((item:string) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
        <div>
          <h2>Время работы</h2>
          <p>{item.time_days}</p>
          <p>
            {item.time_hours_start}:00 - {item.time_hours_end}:00
          </p>
        </div>
        <div>
          <h2>Контакты</h2>
          <div className="list">
            <p>{item.number}</p>
          </div>
          <p>{item.email}</p>
        </div>
        <div>
          <h2>Расположение</h2>
          <p>{item.location}</p>
        </div>
        <a href="https://yandex.ru/maps/?um=constructor%3Af2f5caf6448b1ab3548e44bc551bdf5f59dbf866488697858b3059f82f0bca7d&source=constructorLink">
          <div>
            <img className="img_map" src={item.image_map} alt="" />
            <div className="but_map">
              <p>Посмотреть на карте</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
