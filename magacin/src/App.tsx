import React from "react";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";

import { StoragePage } from "./pages/StoragePage";
import RegisterForm from "./pages/RegisterForm";
import ProfilPage from "./pages/ProfilPage";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/magacin" element={<StoragePage />} />
          <Route path="/profile" element={<ProfilPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
