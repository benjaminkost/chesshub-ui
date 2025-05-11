import './styles/App.css'
import { Registration } from "./pages/Registration.jsx";
import {BrowserRouter, Route, Routes} from "react-router";
import { Login } from "./pages/Login.jsx";
import {UploadImage} from "./pages/UploadImage.jsx";
import {Home} from "./pages/Home.jsx";

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
                  </Routes>
              </main>
          </BrowserRouter>
      </>
  )
}
