import {BrowserRouter, Route, Routes} from "react-router";
import {Home} from "./pages/Home";
import OwnGamesHistory from "./pages/OwnGamesHistory";
import ClubsGamesHistory from "./pages/ClubsGamesHistory";
import ViewSingleGame from "./pages/ViewSingleGame";
import ClubAffiliation from "./pages/ClubAffiliation";
import TeamManagement from "./pages/TeamManagement";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import ClubManagement from "@/pages/ClubManagement";
import {InputGame} from "@/pages/InputGame";
import {ProfileSettingsPage} from "@/pages/ProfileSettingsPage";
import {RequestNewPasswordPage} from "@/pages/RequestNewPasswordPage";
import {Impressum} from "@/pages/Impressum";
import {AboutChessHub} from "@/pages/AboutChessHub";
import {BugReport} from "@/pages/BugReport";
import {LookupContext, LookupData} from "@/context/LookupContext";
import React from "react";
import {ROUTES} from "@/routes";
import {AuthProvider} from "@/context/AuthContext";

import { clubsApi, usersApi } from "@/api/chesshub";

export function App() {

    const [lookup, setLookup] = React.useState<LookupData>({ usersSimple: {}, clubsSimple: {} });

    React.useEffect(() => {
        const fetchLookups = async () => {
            try {
                const [clubsRes, usersRes] = await Promise.all([
                    clubsApi.getAllClubs(),
                    usersApi.getAllUsers()
                ]);

                setLookup({
                    clubsSimple: Object.fromEntries(
                        clubsRes.data.map(c => [c.id, { ...c }])
                    ),
                    usersSimple: Object.fromEntries(
                        usersRes.data.map(u => [u.id, { ...u }])
                    )
                });
            } catch (error) {
                console.error("Failed to fetch lookup data:", error);
            }
        };

        fetchLookups();
    }, []);

    return (
        <AuthProvider>
          <LookupContext.Provider value={lookup}>
              <BrowserRouter>
                  <main>
                      <Routes>
                          <Route path={ROUTES.HOME.url} element={< Home />} />
                          <Route path={ROUTES.AUTH.REGISTER.url} element={< RegistrationPage />} />
                          <Route path={ROUTES.AUTH.LOGIN.url} element={< LoginPage />} />
                          <Route path={ROUTES.USER.CLUB_AFFILIATION.url} element={< ClubAffiliation />} />
                          <Route path={ROUTES.USER.SETTINGS.url} element={<ProfileSettingsPage/>} />
                          <Route path={ROUTES.GAMES.LIST_USER.url} element={< OwnGamesHistory />} />
                          <Route path={ROUTES.GAMES.LIST_CLUB.url} element={< ClubsGamesHistory />} />
                          <Route path={ROUTES.GAMES.VIEW.url} element={< ViewSingleGame /> } />
                          <Route path={ROUTES.GAMES.CREATE.url} element={< InputGame />} />
                          <Route path={ROUTES.TEAMS.MANAGE.url} element={< TeamManagement />} />
                          <Route path={ROUTES.CLUBS.MANAGE.url} element={< ClubManagement />} />
                          <Route path={ROUTES.AUTH.REQUEST_NEW_PASSWORD.url} element={<RequestNewPasswordPage/>} />
                          <Route path={ROUTES.IMPRESSUM.url} element={< Impressum />} />
                          <Route path={ROUTES.ABOUT.url} element={< AboutChessHub />} />
                          <Route path={ROUTES.BUG_REPORT.url} element={< BugReport />}/>
                      </Routes>
                  </main>
              </BrowserRouter>
          </LookupContext.Provider>
        </AuthProvider>
      )
}
