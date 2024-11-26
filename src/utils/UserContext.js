import { createContext } from "react";

const UserContext = createContext({
  loggedIn: "Name of the User",
});



export default UserContext;