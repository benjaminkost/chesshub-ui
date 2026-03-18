import { Registration } from "./pages/Registration.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import { Login } from "./pages/Login.tsx";
import {UploadImage} from "./pages/UploadImage.tsx";
import {Home} from "./pages/Home.tsx";
import OwnGamesHistory from "./pages/OwnGamesHistory.js";
import TeamGamesHistory from "./pages/TeamGamesHistory.js";
import ViewSingleGame from "./pages/ViewSingleGame.js";
import ClubAffiliation from "./pages/ClubAffiliation.js";

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
                  </Routes>
              </main>
          </BrowserRouter>
      </>
  )
}
