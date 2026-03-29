import {BrowserRouter, Route, Routes} from "react-router";
import {UploadImage} from "./pages/UploadImage";
import {Home} from "./pages/Home";
import OwnGamesHistory from "./pages/OwnGamesHistory";
import TeamGamesHistory from "./pages/TeamGamesHistory";
import ViewSingleGame from "./pages/ViewSingleGame";
import ClubAffiliation from "./pages/ClubAffiliation";
import TeamManagement from "./pages/TeamManagement";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import ClubManagement from "@/pages/ClubManagement";
import {InputGameByChessBoardPage} from "@/pages/InputGameByChessBoardPage";
import {ProfileSettingsPage} from "@/pages/ProfileSettingsPage";
import {RequestNewPasswordPage} from "@/pages/RequestNewPasswordPage";
import {Impressum} from "@/pages/Impressum";
import {AboutChessHub} from "@/pages/AboutChessHub";

export function App() {

  return (
      <>
          <BrowserRouter>
              <main>
                  <Routes>
                      <Route path="/" element={< Home />} />
                      <Route path="/auth/register" element={< RegistrationPage />} />
                      <Route path="/auth/signup" element={< RegistrationPage />} />
                      <Route path="/auth/login" element={< LoginPage />} />
                      <Route path="/auth/signin" element={< LoginPage />} />
                      <Route path="/uploadImage" element={< UploadImage />} />
                      <Route path="/ownGamesHistory" element={< OwnGamesHistory />} />
                      <Route path="/teamGamesHistory" element={< TeamGamesHistory />} />
                      <Route path="/view-game" element={< ViewSingleGame /> } />
                      <Route path="/club-affiliation" element={< ClubAffiliation />} />
                      <Route path={"/team-management"} element={< TeamManagement />} />
                      <Route path={"/club-management"} element={< ClubManagement />} />
                      <Route path={"/input-game-by-chessboard"} element={< InputGameByChessBoardPage />} />
                      <Route path={"/profile-settings"} element={<ProfileSettingsPage/>} />
                      <Route path={"/request-new-password"} element={<RequestNewPasswordPage/>} />
                      <Route path={"/impressum"} element={< Impressum />} />
                      <Route path={"/about"} element={< AboutChessHub />} />
                  </Routes>
              </main>
          </BrowserRouter>
      </>
  )
}
