import { createContext } from "react";

export const UserContext = createContext({
  firstName: null,
  middleName: null,
  lastName: null,
  email: null,
  preferredName: null,
  gender: null,
  pronouns: null,
  imageUrl: `data/uploads/images/default.svg`,
  accounts: null, //Admin, Faculty, Student, Staff, Industry Partner
  signedInAs: null,
  accountID: null,
  schoolID: null,
  accountValues: null,
  setUser: () => {},
  removeUser: () => {},
  switchAccount: () => {},
  updateAccount: () => {},
});
