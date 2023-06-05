import { User } from "firebase/auth"
import { userActionTypes } from "./userActionTypes"

type UserState={
    currentUser: null | User;
}

interface UserAction {
    type: any,
    payload: null | User
}

const initailState: UserState = {
    currentUser: null
}
export const userReducer = (state = initailState, action: UserAction) => {
    const { type, payload } = action;
    switch (type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state
    }
}