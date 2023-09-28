import { UserInfo } from "firebase/auth"
import { userActionTypes } from "./userActionTypes"

type UserState={
    currentUser: null | UserInfo;
    themeMode: "light" | "dark";
}

interface UserAction {
    type: any,
    payload: null | UserInfo | "light" | "dark"
}

const initailState: UserState = {
    currentUser: null,
    themeMode: "light"
}
export const userReducer = (state = initailState, action: UserAction) => {
    const { type, payload } = action;
    switch (type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload as null | UserInfo
            }
        case userActionTypes.SET_CURRENT_THEME_MODE:
            return {
                ...state,
                themeMode: payload as "light" | "dark"
            }
        default:
            return state
    }
}