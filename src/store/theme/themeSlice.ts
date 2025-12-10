import { initialThemes } from "@/mock";
import { Theme } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface ThemeState {
  value: Theme[];
}

const initialState: ThemeState = {
  value: initialThemes,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<Theme[]>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateTheme } = themeSlice.actions;
export const selectThemes = (state: RootState) => state.theme.value;

export default themeSlice.reducer;
