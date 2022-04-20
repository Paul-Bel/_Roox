import {Dispatch} from "react"
import {usersAPI} from "../API/api";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store";

export type UsersStateType = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}
export type InfoUserType = "Профиль пользоваетля" | "Список пользователей"
type Set_Users_AC_Type = ReturnType<typeof setUsersAC>
type Set_Preload_AC_Type = ReturnType<typeof setLoadAC>
type Open_Profile_AC_Type = ReturnType<typeof openProfileAC>
type AC_Type = Set_Users_AC_Type | Set_Preload_AC_Type | Open_Profile_AC_Type

type InitialStateType = { userData: Array<UsersStateType>, load: boolean, profileIsOpen: InfoUserType }
const initialState: InitialStateType = {
    userData: [],
    load: false,
    profileIsOpen: "Список пользователей"
}

const userReducer = (state: InitialStateType = initialState, action: AC_Type): InitialStateType => {
    switch (action.type) {
        case 'Set_Users':
            return {...state, userData: action.payload};
        case  'Set_Load':
            return {...state, load: action.payload};
        case  'OpenProfile':
            return {...state, profileIsOpen: action.payload};
        default:
            return state;
    }
}
const setUsersAC = (payload: UsersStateType[]) => ({type: "Set_Users", payload} as const)
const setLoadAC = (payload: boolean) => ({type: "Set_Load", payload} as const)
export const openProfileAC = (payload: InfoUserType) => ({type: "OpenProfile", payload} as const)

export const SetUsersTC = () => (dispatch: ThunkDispatch<AppStateType, unknown, AC_Type>) => {
    dispatch(setLoadAC(true))
    usersAPI.getContacts()
        .then(res => dispatch(setUsersAC(res.data)))
        .catch(err => alert('try letter'))
        .finally(() => dispatch(setLoadAC(false)))
}


export default userReducer