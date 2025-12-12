import { Game } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface GameState {
  value: Game;
}

const initialState: GameState = {
  value: {
    id: 0,
    players: [],
    theme: {
      id: 0,
      name: "",
      words: [],
    },
    mode: "with-word",
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateGameState: (state, action: PayloadAction<Game>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateGameState } = gameSlice.actions;
export const selectGameState = (state: RootState) => state.game.value;

export default gameSlice.reducer;
