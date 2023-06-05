import { User } from "firebase/auth";
import { createAction } from "utils/redux/reduxUtils";
import { userActionTypes } from "./userActionTypes";

export const setCurrentUser = (user: null | User) => createAction(userActionTypes.SET_CURRENT_USER, user);