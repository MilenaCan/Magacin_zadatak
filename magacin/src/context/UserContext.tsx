import React, { createContext, useState, ReactNode, useEffect } from "react";
interface User {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
}
interface UserContextType {
  register: (
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string
  ) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
  name: string | null;
  surname: string | null;
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
  const [name, setName] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const register = (
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string
  ) => {
    const storedUsers = localStorage.getItem("users");
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
    const newUser = { name, surname, username, email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    console.log("Registrovani:", JSON.stringify([...users, newUser]));
    console.log("REGISTROVAO SE: " + storedUsers);
  };

  const login = (username: string, password: string) => {
    const storedUsers = localStorage.getItem("users");
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
    console.log("KORISNIK " + storedUsers);
    const user = users.find(
      (user: any) => user.username === username && user.password === password
    );

    if (user) {
      console.log("Korisnik pronadjen:", user);
      console.log("DA LI JE ULOGOVAN  " + isLoggedIn);
      setIsLoggedIn(true);
      setName(user.name);
      setSurname(user.surname);
      setUsername(username);
      setEmail(user.email);
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      console.error("Neispravni podaci za prijavu");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setName(null);
    setSurname(null);
    setUsername(null);
    setEmail(null);
    localStorage.removeItem("currentUser");
    //localStorage.removeItem("users");
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const { name, surname, username, email } = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setName(name);
      setSurname(surname);
      setUsername(username);
      setEmail(email);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        login,
        logout,
        isLoggedIn,
        name,
        surname,
        username,
        email,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
