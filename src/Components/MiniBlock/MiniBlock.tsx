import { useState, useEffect } from "react";
import { ref, update } from "firebase/database";
import { database } from "../../Services/store/index";

import FullBlock from "../FullBlock/FullBlock";

import "./MiniBlock.scss";

export default function MiniBlock(item:any) {
  const [showFullBlock, setShowFullBlock] = useState<boolean>(false);
  const [showBlock, setShowBlock] = useState(false);
  const [heart, setHeart] = useState("/heart_empty.svg");

  class RegExp1 extends RegExp {
    constructor(str: any) {
      super(str);
      this.pattern = str;
    }
    [Symbol.search](str: any) {
      return str.indexOf(this.pattern);
    }
  }

  useEffect(() => {
    let help = 0;
    if (item.name.search(new RegExp1(item.input)) == 0) {
      if (item.servicesArr.length == 0) {
        help = help + 1;
      } else {
        let a = 0;
        item.services.forEach(function (item1:string) {
          item.servicesArr.forEach(function (item2:string) {
            if (item1 !== item2) {
            } else {
              a = a + 1;
              if (a == item.servicesArr.length) {
                help = help + 1;
              }
            }
          });
        });
      }

      if (item.facilitiesArr.length == 0) {
        help = help + 1;
      } else {
        let a = 0;
        item.facilities.forEach(function (item1:string) {
          item.facilitiesArr.forEach(function (item2:string) {
            if (item1 !== item2) {
            } else {
              a = a + 1;
              if (a == item.facilitiesArr.length) {
                help = help + 1;
              }
            }
          });
        });
      }

      if (+item.minCost <= item.cost && item.cost <= +item.maxCost) {
        help = help + 1;
      }

      if (help == 3) {
        setShowBlock(true);
      } else {
        setShowBlock(false);
      }
    } else {
      if (item.input !== undefined) {
        setShowBlock(false);
      }
    }
  }, [item.input, item.showFilter]);

  useEffect(() => {
    item.favorites.forEach(function (item:any) {
      if (item == item.name) {
        setHeart("/heart.svg");
      }
      if (item.classBlock == "favorites") {
        if (item == item.name) {
          setShowBlock(true);
        }
      }
    });
  }, []);

  function updateDatabase(params:string) {
    let newArr:any[] = [];
    item.favorites.forEach(function (item:any) {
      newArr.push(item);
    });
    if (params == "add") {
      newArr.push(item.name);
    } else {
      newArr = newArr.filter((newArr) => newArr !== item.name);
    }
    item.setFavorites(newArr);
    const updates:any = {};
    const postData = newArr;
    console.log(postData);
    updates["/users/" + item.keyFavorites + "/favorites/"] = postData;
    return update(ref(database), updates);
  }
  function heartFunction() {
    setTimeout(() => {
      setShowFullBlock(false);
    }, 1);
    if (heart == "/heart_empty.svg") {
      setHeart("/heart.svg");
      updateDatabase("add");
    } else {
      setHeart("/heart_empty.svg");
      updateDatabase("delete");
    }
  }
  return (
    <div className="mini_block">
      {showFullBlock && (
        <div className="full_block_all">
          <FullBlock item={item} setShowBlock={setShowFullBlock} />
        </div>
      )}
      {showBlock && (
        <div className="mini_block_2" onClick={() => setShowFullBlock(true)}>
          <div className="top">
            <img className="logo_img" src={item.logo} alt="" />
            <div className="no_logo">
              <div className="box1">
                <p className="name">{item.name}</p>
                <img onClick={() => heartFunction()} src={heart} alt="" />
              </div>
              <div className="box2">
                <img src="/point_company.svg" alt="" />
                <p>{item.location}</p>
              </div>
              <div className="box3_4">
                <div className="box3">
                  <img src="/star_company.svg" alt="" />
                  <p>4,8</p>
                </div>
                <div className="box4">
                  <img src="/room_company.svg" alt="" />
                  <p>{item.square} м2</p>
                </div>
              </div>
            </div>
          </div>
          <div className="title">
            {item.services.map((item:string) => (
              <p key={item}>{item}, </p>
            ))}
          </div>
          <div className="bottom">
            <p>Звукозапись</p>
            <p className="cost_company">от {item.cost}</p>
            <p>руб/час</p>
          </div>
        </div>
      )}
    </div>
  );
}
