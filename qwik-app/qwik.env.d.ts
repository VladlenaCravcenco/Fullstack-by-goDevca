// This file can be used to add references for global types like `vite/client`.

// Add global `vite/client` types. For more info, see: https://vitejs.dev/guide/features#client-types
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly TELEGRAM_BOT_TOKEN: string;
  readonly TELEGRAM_CHAT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}