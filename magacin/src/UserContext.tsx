import React, { createContext, useState, ReactNode, useEffect } from "react";

interface UserContextType {
  login: (username: string, email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
  username: string | null;
  email: string | null;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const login = (username: string, email: string, password: string) => {
    if (username && email && password) {
      setIsLoggedIn(true);
      setUsername(username);
      setEmail(email);

      const storedUsers = localStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const newUser = { username, email };
      localStorage.setItem("users", JSON.stringify([...users, newUser]));

      localStorage.setItem("currentUser", JSON.stringify(newUser));
    }
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    setEmail(null);
    localStorage.removeItem("currentUser");
    //localStorage.removeItem("users");
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const { username, email } = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUsername(username);
      setEmail(email);
    }
  }, []);
  return (
    <UserContext.Provider
      value={{ login, logout, isLoggedIn, username, email }}
    >
      {children}
    </UserContext.Provider>
  );
};
