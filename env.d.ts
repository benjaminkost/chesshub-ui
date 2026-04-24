/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CHESSHUB_CORE_BASEURL: string;
    readonly VITE_CHESS_SCORESHEET_DIGITALIZATION_BASEURL: string;
    readonly VITE_USE_MOCKS: string;
    readonly VITE_OPENAPI_SPEC_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}