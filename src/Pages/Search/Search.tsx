import { useSelector } from "react-redux";
import { useState } from "react";
import { userArrAdd } from "../../Common/userArrAdd";

import Filter from "../../Components/Filter/Filter";
import MiniBlock from "../../Components/MiniBlock/MiniBlock";
import arrCompanies from "../../../companies.json";

import "./Search.scss";

export default function Search() {
  const [input, setInput] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [servicesArr, setServicesArr] = useState<any[]>([]);
  const [facilitiesArr, setFacilitiesArr] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [key, setKey] = useState<string>("");

  const [minCost, setMinCost] = useState<number>(20);
  const [maxCost, setMaxCost] = useState<number>(100);

  const userArr = useSelector((state:any) => state.user.user);
  if (key == "") {
    userArrAdd(
      userArr,
      undefined,
      undefined,
      setKey,
      undefined,
      undefined,
      setFavorites
    )
  }

  const companies = Object.values(arrCompanies);

  return (
    <div className="search">
      {showFilter && (
        <Filter
          setShowFilter={setShowFilter}
          services={servicesArr}
          setServices={setServicesArr}
          facilities={facilitiesArr}
          setFacilities={setFacilitiesArr}
          setMinCost={setMinCost}
          setMaxCost={setMaxCost}
        ></Filter>
      )}
      <div className="nav">
        <img src="/Search.svg" alt="" />
        <input
          onChange={(e) => setInput(e.target.value)}
          placeholder="Поиск"
          type="text"
        />
        <img
          onClick={() => setShowFilter(true)}
          className="filter_img"
          src="/filter.svg"
          alt=""
        />
      </div>
      {companies.map((item) => (
        <MiniBlock
          input={input}
          showFilter={showFilter}
          item={item}
          {...item}
          key={item.id}
          servicesArr={servicesArr}
          facilitiesArr={facilitiesArr}
          minCost={minCost}
          maxCost={maxCost}
          favorites={favorites}
          setFavorites={setFavorites}
          keyFavorites={key}
        ></MiniBlock>
      ))}
      <a href="https://yandex.ru/maps/?um=constructor%3Af2f5caf6448b1ab3548e44bc551bdf5f59dbf866488697858b3059f82f0bca7d&source=constructorLink">
        <div className="map">
          <img src="/map.svg" alt="" />
          <p>На карте</p>
        </div>
      </a>
    </div>
  );
}
