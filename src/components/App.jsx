import '../styles/App.css'
import { Registration } from "./Registration";
import {BrowserRouter, Route, Routes} from "react-router";

export function App() {

  return (
      <>
          <BrowserRouter>
              <main>
                  <Routes>
                      <Route path="/auth/register" element={< Registration />} />
                      <Route path="/auth/signup" element={< Registration />} />
                  </Routes>
              </main>
          </BrowserRouter>
      </>
  )
}
