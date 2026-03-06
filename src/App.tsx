import { Registration } from "./pages/Registration.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import { Login } from "./pages/Login.tsx";
import {UploadImage} from "./pages/UploadImage.tsx";
import {Home} from "./pages/Home.tsx";
import GamesHistory from "./pages/GamesHistory.js";

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
                      <Route path="/ownGamesHistory" element={< GamesHistory />} />
                  </Routes>
              </main>
          </BrowserRouter>
      </>
  )
}
