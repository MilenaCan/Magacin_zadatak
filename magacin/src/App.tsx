import React from "react";
import { UserProvider } from "./UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";

import { Magacin } from "./Magacin";
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/magacin" element={<Magacin />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
