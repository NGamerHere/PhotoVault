import './App.css';
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import NoPage from "./components/NoPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route >
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard /> } />
                  <Route path="*" element={<NoPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
