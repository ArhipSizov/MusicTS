import { useEffect, useState } from "react";

import "./EquipmentServices.scss";

export default function EquipmentServices(item:any) {
 
  
  const [classBlock, setClassBlock] = useState<string>("equipment_services");

  useEffect(() => {
    item.arr.forEach(function (item:any) {
      if (item  == item.cost) {
        setClassBlock("equipment_services equipment_services_active")
      }
    });
  }, []);

  function functionName() {
    let newArr = item.arr;

    if (classBlock == "equipment_services") {
      setClassBlock("equipment_services equipment_services_active");
      newArr.push(item.cost);
    } else {
      setClassBlock("equipment_services");
      newArr = newArr.filter((newArr:any) => newArr !== item.cost);
    }

    item.setArr(newArr);

  }
  return (
    <div className={classBlock} onClick={() => functionName()}>
      <p>{item.name}</p>
      <p>{item.cost} p.</p>
    </div>
  );
}
