import { Route, Routes } from "react-router-dom";
import { ConfigurationPage, GamePage, HomePage, NewGamePage } from "../pages";

const BASE_PATH = import.meta.env.VITE_BASE_URL || "/theimpostorgame";
const CONFIG_PATH =
  import.meta.env.VITE_CONFIG_PATH || "/theimpostorgame/config";
const NEW_GAME_PATH =
  import.meta.env.VITE_NEW_GAME_PATH || "/theimpostorgame/new-game";
const GAME_PATH = import.meta.env.VITE_GAME_PATH || "/theimpostorgame/game";

//TODO: adicionar as rotas do jogo na store pegando do .env, assim no projeto apenas pega da store e nao precisa ficar importando toda hora de .env

const WebRouter = () => {
  return (
    <Routes>
      <Route path={`${BASE_PATH}`} element={<HomePage />} />
      <Route path={`${CONFIG_PATH}`} element={<ConfigurationPage />} />
      <Route path={`${NEW_GAME_PATH}`} element={<NewGamePage />} />
      <Route path={`${GAME_PATH}`} element={<GamePage />} />
    </Routes>
  );
};

export default WebRouter;
