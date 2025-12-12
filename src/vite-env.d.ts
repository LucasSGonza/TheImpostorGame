declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.gif";

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_CONFIG_PATH: string;
  readonly VITE_NEW_GAME_PATH: string;
  readonly VITE_GAME_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
