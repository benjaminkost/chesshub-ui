/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CHESS_SCORESHEET_DIGITALIZATION_BASEURL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}