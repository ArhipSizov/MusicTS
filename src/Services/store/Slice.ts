import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    user: [],
  },
  reducers: {
    addUser(state: any, action) {
      state.user.push({
        id: new Date().toISOString(),
        email: action.payload.email,
        password: action.payload.pasvord,
        name: action.payload.name,
        number: action.payload.number,
        key: action.payload.key,
        favorites: action.payload.favorites,
        card: action.payload.card,
        rooms: action.payload.rooms,
      });
    },
  },
});

export const { addUser } = slice.actions;

export default slice.reducer;
