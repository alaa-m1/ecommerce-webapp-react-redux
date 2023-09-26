import { User, UserInfo } from "firebase/auth";
import { createAction } from "utils/redux/reduxUtils";
import { userActionTypes } from "./userActionTypes";

export const setCurrentUser = (user: null | UserInfo) => createAction(userActionTypes.SET_CURRENT_USER, user);