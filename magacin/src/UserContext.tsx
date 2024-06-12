import React, { createContext, useState, ReactNode } from "react";

interface UserContextType {
  login: (username: string, email: string, password: string) => void;
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
    }
  };

  return (
    <UserContext.Provider value={{ login, isLoggedIn, username, email }}>
      {children}
    </UserContext.Provider>
  );
};
