import { Registration } from "./pages/Registration";
import {BrowserRouter, Route, Routes} from "react-router";
import { Login } from "./pages/Login";
import {UploadImage} from "./pages/UploadImage";
import {Home} from "./pages/Home";
import OwnGamesHistory from "./pages/OwnGamesHistory";
import TeamGamesHistory from "./pages/TeamGamesHistory";
import ViewSingleGame from "./pages/ViewSingleGame";
import ClubAffiliation from "./pages/ClubAffiliation";
import TeamManagement from "./pages/TeamManagement";

export function App() {

  return (
      <>
          <BrowserRouter>
              <main>
                  <Routes>
                      <Route path="/" element={< Home />} />
                      <Route path="/auth/register" element={< Registration />} />
                      <Route path="/auth/signup" element={< Registration />} />
                      <Route path="/auth/login" element={< Login />} />
                      <Route path="/auth/signin" element={< Login />} />
                      <Route path="/uploadImage" element={< UploadImage />} />
                      <Route path="/ownGamesHistory" element={< OwnGamesHistory />} />
                      <Route path="/teamGamesHistory" element={< TeamGamesHistory />} />
                      <Route path="/view-game" element={< ViewSingleGame /> } />
                      <Route path="/club-affiliation" element={< ClubAffiliation />} />
                      <Route path={"/team-management"} element={< TeamManagement />} />
                  </Routes>
              </main>
          </BrowserRouter>
      </>
  )
}
