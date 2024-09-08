function userArrAdd(
  userArr: any,
  setName?: any,
  setNumber?: any,
  setKey?: any,
  setEmail?: any,
  setPasvord?: any,
  setFavorites?: any,
  setCard?: any,
  setRoom?: any,
) {
  userArr.forEach((element: any) => {
    if (setName !== undefined) {
      setName(element.name);
    }
    if (setNumber !== undefined) {
      setNumber(element.number);
    }
    if (setKey !== undefined) {
      setKey(element.key);
    }
    if (setEmail !== undefined) {
      setEmail(element.email);
    }
    if (setPasvord !== undefined) {
      setPasvord(element.password);
    }
    if (element.favorites !== undefined && setFavorites !== undefined) {
      setFavorites(element.favorites);
    }
    if (element.card !== undefined && setCard !== undefined) {
      setCard(element.card);
    }
    if (element.room !== undefined && setRoom !== undefined) {
      setRoom(element.card);
    }
  });
}

export { userArrAdd };
