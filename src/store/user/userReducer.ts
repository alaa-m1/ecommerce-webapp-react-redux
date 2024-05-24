import { UserInfo } from "firebase/auth";
import { userActionTypes } from "./userActionTypes";

type UserState = {
  currentUser: null | UserInfo;
  themeMode: "light" | "dark";
  direction: "ltr" | "rtl";
  notificationDate: string | null;
};

interface UserAction {
  type: any;
  payload: null | UserInfo | "light" | "dark" | "ltr" | "rtl";
}

const initailState: UserState = {
  currentUser: null,
  themeMode: "light",
  direction: "ltr",
  notificationDate: null,
};
export const userReducer = (state = initailState, action: UserAction) => {
  const { type, payload } = action;
  switch (type) {
    case userActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload as null | UserInfo,
      };
    case userActionTypes.SET_CURRENT_THEME_MODE:
      return {
        ...state,
        themeMode: payload as "light" | "dark",
      };
    case userActionTypes.SET_DOCUMENT_DIRECTION:
      return {
        ...state,
        direction: payload as "ltr" | "rtl",
      };
    case userActionTypes.SET_NOTIFICATION_DATE:
      return {
        ...state,
        notificationDate: payload as string,
      };
    default:
      return state;
  }
};
