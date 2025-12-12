import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import gameReducer from "./game/gameSlice";
import pathsReducer from "./paths/pathsSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    game: gameReducer,
    paths: pathsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
