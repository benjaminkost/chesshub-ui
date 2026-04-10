export const ROUTES = {
    HOME: {
        func: () => "/",
        url: "/"
    },
    IMPRESSUM: {
        func: () => "/impressum",
        url: "/impressum"
    },
    ABOUT: {
        func: () => "/about",
        url: "/about"
    },
    BUG_REPORT: {
        func: () => "/bug-report",
        url: "/bug-report"
    },
    AUTH: {
        LOGIN: {
            func: () => "/auth/login",
            url: "/auth/login"
        },
        REGISTER: {
            func: () => "/auth/register",
            url: "/auth/register"
        },
        REQUEST_NEW_PASSWORD: {
            func: () => "/request-new-password",
            url: "/request-new-password"
        }
    },
    USER: {
        SETTINGS: {
            func: (userId: number) => `/users/${userId}/settings`,
            url: "/users/:userId/settings"
        },
        CLUB_AFFILIATION: {
            func: (userId: number) => `/users/${userId}/clubs`,
            url: "/users/:userId/clubs"
        }
    },
    GAMES: {
        CREATE: {
            func: () => "/game/new",
            url: "/game/new"
        },
        LIST_CLUB: {
            func: (clubId: number) => `/games/club/${clubId}`,
            url: "/games/club/:clubId"
        },
        LIST_USER: {
            func: (userId: number) => `/games/user/${userId}`,
            url: "/games/user/:userId"
        },
        VIEW: {
            func: (gameId: number) => `/games/${gameId}`,
            url: "/games/:gameId"
        },
        EDIT: {
            func: (gameId: number) => `/games/${gameId}`,
            url: "/games/:gameId"
        }
    },
    TEAMS: {
        MANAGE: {
            func: (teamId: number) => `/teams/${teamId}`,
            url: "/teams/:teamId"
        }
    },
    CLUBS: {
        MANAGE: {
            func: (clubId: number) => `/clubs/${clubId}`,
            url: "/clubs/:clubId"
        }
    }
};