import '../styles/App.css'
import { Registration } from "./Registration";
import {BrowserRouter, Route, Routes} from "react-router";
import { Login } from "./Login";

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
                  </Routes>
              </main>
          </BrowserRouter>
      </>
  )
}
