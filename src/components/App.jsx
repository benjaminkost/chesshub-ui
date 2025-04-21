import '../styles/App.css'
import { Registration } from "./Registration";
import {BrowserRouter, Route, Routes} from "react-router";
import { Login } from "./Login";
import {UploadImage} from "./UploadImage.jsx";

export function App() {

  return (
      <>
          <BrowserRouter>
              <main>
                  <Routes>
                      <Route path="/auth/register" element={< Registration />} />
                      <Route path="/auth/signup" element={< Registration />} />
                      <Route path="/auth/login" element={< Login />} />
                      <Route path="/auth/signin" element={< Login />} />
                      <Route path="/uploadImage" element={< UploadImage />} />
                  </Routes>
              </main>
          </BrowserRouter>
      </>
  )
}
