import {BrowserRouter, Route, Routes} from "react-router";
import {Home} from "./pages/Home";
import OwnGamesHistory from "./pages/OwnGamesHistory";
import TeamGamesHistory from "./pages/TeamGamesHistory";
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
import {allUsers, dummyAllClubs} from "@/dummyData";

export function App() {

    const [lookup, setLookup] = React.useState<LookupData>({ usersSimple: {}, clubsSimple: {} });

    React.useEffect(() => {
        setLookup({
            clubsSimple: Object.fromEntries(
                dummyAllClubs.map(c => [c.id, { ...c }])
            ),
            usersSimple: Object.fromEntries(
                allUsers.map(u => [u.id, {...u}])
            )
        });
    }, []);

    return (
          <LookupContext.Provider value={lookup}>
              <BrowserRouter>
                  <main>
                      <Routes>
                          <Route path="/" element={< Home />} />
                          <Route path="/auth/register" element={< RegistrationPage />} />
                          <Route path="/auth/signup" element={< RegistrationPage />} />
                          <Route path="/auth/login" element={< LoginPage />} />
                          <Route path="/auth/signin" element={< LoginPage />} />
                          <Route path="/own-games-history" element={< OwnGamesHistory />} />
                          <Route path="/team-games-history" element={< TeamGamesHistory />} />
                          <Route path="/view-game" element={< ViewSingleGame /> } />
                          <Route path="/club-affiliation" element={< ClubAffiliation />} />
                          <Route path={"/team-management"} element={< TeamManagement />} />
                          <Route path={"/club-management"} element={< ClubManagement />} />
                          <Route path={"/input-game"} element={< InputGame />} />
                          <Route path={"/profile-settings"} element={<ProfileSettingsPage/>} />
                          <Route path={"/request-new-password"} element={<RequestNewPasswordPage/>} />
                          <Route path={"/impressum"} element={< Impressum />} />
                          <Route path={"/about"} element={< AboutChessHub />} />
                          <Route path={"/bug-report"} element={< BugReport />}/>
                      </Routes>
                  </main>
              </BrowserRouter>
          </LookupContext.Provider>
      )
}
