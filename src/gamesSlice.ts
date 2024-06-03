import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Game from "./types/Game";

export interface GamesState {
  list: Game[];
}

const initialState: GamesState = {
  list: [],
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    set: (state, action: PayloadAction<Game[]>) => {
      state.list = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set } = gamesSlice.actions;

export default gamesSlice.reducer;
