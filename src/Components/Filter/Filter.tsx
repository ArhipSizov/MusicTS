import { useState } from "react";
import { useEffect } from "react";

import "./Filter.scss";

export default function Filter(item:any) {
 
  const [rehearsal, setRehearsal] = useState<string>("not_active");
  const [recording, setRecording] = useState<string>("not_active");
  const [mixing, setMixing] = useState<string>("not_active");
  const [mastering, setMastering] = useState<string>("not_active");
  const [arrangement, setArrangement] = useState<string>("not_active");
  const [voice, setVoice] = useState<string>("not_active");
  const [song, setSong] = useState<string>("not_active");
  const [digitization, setDigitization] = useState<string>("not_active");
  const [restoration, setRestoration] = useState<string>("not_active");

  const [Wi_Fi, setWi_Fi] = useState<string>("not_active");
  const [parking, setParking] = useState<string>("not_active");
  const [air, setAir] = useState<string>("not_active");
  const [hall, setHall] = useState<string>("not_active");
  const [tea, setTea] = useState<string>("not_active");
  const [rest, setRest] = useState<string>("not_active");
  const [toilet, setToilet] = useState<string>("not_active");
  const [smoking, setSmoking] = useState<string>("not_active");
  const [entrance, setEntrance] = useState<string>("not_active");
  const [equipment, setEquipment] = useState<string>("not_active");

  function addFilterServices(params:string, setParams:any, nameParams:string) {
    let newArr = item.services;
    if (params == "not_active") {
      setParams("active");
      newArr.push(nameParams);
    } else {
      setParams("not_active");
      newArr = newArr.filter((newArr:any) => newArr !== nameParams);
    }
    item.setServices(newArr);
  }
  useEffect(() => {
    item.setServices([]);
  }, []);

  function addFilterFacilities(params:string, setParams:any, nameParams:string) {
    let newArr = item.facilities;
    if (params == "not_active") {
      setParams("active");
      newArr.push(nameParams);
    } else {
      setParams("not_active");
      newArr = newArr.filter((newArr:any) => newArr !== nameParams);
    }
    item.setFacilities(newArr);
  }

  useEffect(() => {
    item.setServices([]);
    item.setFacilities([]);
    item.setMinCost(20);
    item.setMaxCost(100);
  }, []);

  return (
    <div className="filter">
      <div onClick={() => item.setShowFilter(false)} className="button">
        Найти
      </div>
      <div className="nav">
        <img onClick={() => item.setShowFilter(false)} src="backAlt.svg" alt="" />
        <p>Фильтры</p>
        <img src="" alt="" />
      </div>
      <div className="no_nav">
        <div className="filter_block_cost">
          <h6>Цена</h6>
          <div>
            <p>От</p>
            <input
              onChange={(event) => item.setMinCost(event.target.value)}
              placeholder="20"
              type="number"
            />
            <p>до</p>
            <input
              onChange={(event) => item.setMaxCost(event.target.value)}
              placeholder="100"
              type="number"
            />
            <p>р.</p>
          </div>
        </div>
        <div className="filter_block">
          <p>Услуги</p>
          <div
            className={rehearsal}
            onClick={() =>
              addFilterServices(rehearsal, setRehearsal, "Репетиция")
            }
          >
            Репетиция
          </div>
          <div
            className={recording}
            onClick={() =>
              addFilterServices(recording, setRecording, "Звукозапись")
            }
          >
            Звукозапись
          </div>
          <div
            className={mixing}
            onClick={() => addFilterServices(mixing, setMixing, "Сведение")}
          >
            Сведение
          </div>
          <div
            className={mastering}
            onClick={() =>
              addFilterServices(mastering, setMastering, "Мастеринг")
            }
          >
            Мастеринг
          </div>
          <div
            className={arrangement}
            onClick={() =>
              addFilterServices(arrangement, setArrangement, "Аранжировка")
            }
          >
            Аранжировка
          </div>
          <div
            className={voice}
            onClick={() => addFilterServices(voice, setVoice, "Озвучивание")}
          >
            Озвучивание
          </div>
          <div
            className={song}
            onClick={() => addFilterServices(song, setSong, "Песня “под ключ”")}
          >
            Песня “под ключ”
          </div>
          <div
            className={digitization}
            onClick={() =>
              addFilterServices(digitization, setDigitization, "Оцифровка")
            }
          >
            Оцифровка
          </div>
          <div
            className={restoration}
            onClick={() =>
              addFilterServices(
                restoration,
                setRestoration,
                "Реставрация звука"
              )
            }
          >
            Реставрация звука
          </div>
        </div>
        <div className="filter_block">
          <p>Удобства</p>
          <div
            className={Wi_Fi}
            onClick={() => addFilterFacilities(Wi_Fi, setWi_Fi, "Wi-Fi")}
          >
            Wi-Fi
          </div>
          <div
            className={parking}
            onClick={() => addFilterFacilities(parking, setParking, "Парковка")}
          >
            Парковка
          </div>
          <div
            className={hall}
            onClick={() => addFilterFacilities(hall, setHall, "Просторный зал")}
          >
            Просторный зал
          </div>
          <div
            className={air}
            onClick={() => addFilterFacilities(air, setAir, "Кондиционер")}
          >
            Кондиционер
          </div>
          <div
            className={tea}
            onClick={() => addFilterFacilities(tea, setTea, "Чай/кофе")}
          >
            Чай/кофе
          </div>
          <div
            className={rest}
            onClick={() => addFilterFacilities(rest, setRest, "Зона отдыха")}
          >
            Зона отдыха
          </div>
          <div
            className={toilet}
            onClick={() => addFilterFacilities(toilet, setToilet, "Туалет")}
          >
            Туалет
          </div>
          <div
            className={smoking}
            onClick={() => addFilterFacilities(smoking, setSmoking, "Курилка")}
          >
            Курилка
          </div>
          <div
            className={entrance}
            onClick={() =>
              addFilterFacilities(entrance, setEntrance, "Отдельный вход")
            }
          >
            Отдельный вход
          </div>
          <div
            className={equipment}
            onClick={() =>
              addFilterFacilities(
                equipment,
                setEquipment,
                "Аренда оборудования"
              )
            }
          >
            Аренда оборудования
          </div>
        </div>
      </div>
    </div>
  );
}
