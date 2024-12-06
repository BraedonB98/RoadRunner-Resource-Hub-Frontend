import { createContext } from "react";

export const AuthContext = createContext({
  imageUrl: null,
  isLoggedIn: false,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
});
