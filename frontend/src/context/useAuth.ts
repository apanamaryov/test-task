import React from "react";
import {UserContext} from "./UserContext";

export function useAuth() {
  return React.useContext(UserContext);
}
