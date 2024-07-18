import { UserInfo } from "firebase/auth";
import { userActionTypes } from "./userActionTypes";

export type ThemeMode = "light" | "dark" | "system";

export type UILanguage="en" | "de" | "ar"

type UserState = {
  currentUser: null | UserInfo;
  themeMode: ThemeMode;
  direction: "ltr" | "rtl";
  uiLanguage: UILanguage;
};

interface UserAction {
  type: any;
  payload: null | UserInfo | ThemeMode | "ltr" | "rtl";
}

const initailState: UserState = {
  currentUser: null,
  themeMode: "light",
  direction: "ltr",
  uiLanguage: "en",
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
        themeMode: payload as ThemeMode,
      };
    case userActionTypes.SET_DOCUMENT_DIRECTION:
      return {
        ...state,
        direction: payload as "ltr" | "rtl",
      };
    case userActionTypes.SET_UI_LANGUAGE:
      return {
        ...state,
        language: payload as UILanguage,
      };
    default:
      return state;
  }
};
