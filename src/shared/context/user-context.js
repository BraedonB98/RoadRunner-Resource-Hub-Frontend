import { createContext } from "react";

export const UserContext = createContext({
  name: null,
  email: null,
  userId: null,
  imageUrl: `data/uploads/images/default.svg`,//will need to add Authorization level to user context -> then make add new resource only appear on appropriate pages
  setUser: () => {},
  removeUser: () => {},
});