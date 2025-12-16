/// <reference types="vite/client" />

declare module "*.gif";

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_CONFIG_PATH: string;
  readonly VITE_NEW_GAME_PATH: string;
  readonly VITE_GAME_PATH: string;
}
