interface ImportMetaEnv {
    readonly VITE_CHESSHUB_CORE_BASEURL: string;
    readonly VITE_CHESS_SCORESHEET_DIGITALIZATION_BASEURL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}