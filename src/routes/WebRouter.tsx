import { Route, Routes } from "react-router-dom";
import { ConfigurationPage, GamePage, HomePage, NewGamePage } from "../pages";

const CONFIG_PATH = import.meta.env.VITE_CONFIG_PATH || "/config";
const NEW_GAME_PATH = import.meta.env.VITE_NEW_GAME_PATH || "/new-game";
const GAME_PATH = import.meta.env.VITE_GAME_PATH || "/game";

const WebRouter = () => {
  return (
    <Routes>
      <Route path={`/`} element={<HomePage />} />
      <Route path={`${CONFIG_PATH}`} element={<ConfigurationPage />} />
      <Route path={`${NEW_GAME_PATH}`} element={<NewGamePage />} />
      <Route path={`${GAME_PATH}`} element={<GamePage />} />
    </Routes>
  );
};

export default WebRouter;
