import { UserInfo } from "firebase/auth";
import { createAction } from "utils/redux/reduxUtils";
import { userActionTypes } from "./userActionTypes";

export const setCurrentUser = (user: null | UserInfo) => createAction(userActionTypes.SET_CURRENT_USER, user);
export const setCurrentThemeMode = (mode: "light" | "dark") => createAction(userActionTypes.SET_CURRENT_THEME_MODE, mode);
export const setDocumentDirection = (direction: "ltr" | "rtl") => createAction(userActionTypes.SET_DOCUMENT_DIRECTION, direction);