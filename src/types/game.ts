import { Player } from "./player";
import { Theme } from "./theme";

export type GameMode = "with-word" | "without-word";

export interface Game {
  id: number;
  players: Player[];
  theme: Theme;
  mode: GameMode;
}
