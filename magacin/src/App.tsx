import React from "react";
import { UserProvider } from "./UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";

import { Magacin } from "./Magacin";
import RegisterForm from "./RegisterForm";
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/magacin" element={<Magacin />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
