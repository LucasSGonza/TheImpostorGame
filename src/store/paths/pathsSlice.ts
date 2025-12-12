import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Paths } from "@/types";

const BASE_PATH = import.meta.env.VITE_BASE_URL || "/";
const CONFIG_PATH = import.meta.env.VITE_CONFIG_PATH || "/config";
const NEW_GAME_PATH = import.meta.env.VITE_NEW_GAME_PATH || "/new-game";
const GAME_PATH = import.meta.env.VITE_GAME_PATH || "/game";

export interface PathsState {
  value: Paths;
}

const initialState: PathsState = {
  value: {
    basePath: `${BASE_PATH}`,
    configPath: `${CONFIG_PATH}/`,
    newGamePath: `${NEW_GAME_PATH}/`,
    gamePath: `${GAME_PATH}/`,
  },
};

export const pathsSlice = createSlice({
  name: "paths",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const {} = pathsSlice.actions;
export const selectPaths = (state: RootState) => state.paths.value;

export default pathsSlice.reducer;
