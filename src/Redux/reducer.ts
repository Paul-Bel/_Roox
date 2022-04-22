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
export type InfoUserType = "Профиль пользоваетеля" | "Список пользователей"
type Set_Users_AC_Type = ReturnType<typeof setUsersAC>
type Set_Preload_AC_Type = ReturnType<typeof setLoadAC>
type Open_Profile_AC_Type = ReturnType<typeof openProfileAC>
type Filter_City_AC_Type = ReturnType<typeof filterCityAC>
type Filter_Company_AC_Type = ReturnType<typeof filterCompanyAC>
type AC_Type = Set_Users_AC_Type | Set_Preload_AC_Type | Open_Profile_AC_Type | Filter_City_AC_Type | Filter_Company_AC_Type

export type FlagType = 'load' | 'editProfile' | 'loaded' | 'FilterCity' | 'FilterCompany' | ''
export type ButtonNamesType =  {ButtonFindCity: string, ButtonFindCompany: string, ButtonEdit: string,
    ButtonBack: string, ButtonSend: string, ButtonCancel: string}
export type InitialStateType = {
    userData: Array<UsersStateType>,
    indicator: FlagType,
    profileIsOpen: InfoUserType
    sortCompany: boolean,
    sortCity: boolean,
    buttonNames: ButtonNamesType
}
const initialState: InitialStateType = {
    userData: [],
    indicator: 'load',
    sortCompany: true,
    sortCity: true,
    profileIsOpen: "Список пользователей",
    buttonNames: {
        ButtonFindCity: 'по городу', ButtonFindCompany: 'по компании', ButtonEdit: 'Редактировать',
        ButtonBack: 'Назад', ButtonSend: 'Отправить', ButtonCancel: 'Отмена'}
}

const userReducer = (state: InitialStateType = initialState, action: AC_Type): InitialStateType => {
    switch (action.type) {
        case 'Set_Users':
            return {...state, userData: action.payload};
        case  'Set_Load':
            return {...state, indicator: action.payload};
        case  'OpenProfile':
            return {
                ...state, userData: state.userData.filter(us => us.id === action.payload.id),
                profileIsOpen: action.payload.profile
            };
        case  'Filter_City': {
            let sort = state.userData.sort((a, b) => a.address.city > b.address.city ? 1 : a.address.city < b.address.city ? -1 : 0)
            let flag: FlagType = state.indicator === 'FilterCity' ? '' : 'FilterCity'
            return {...state, userData: (state.indicator !== 'FilterCity' ? sort : sort.reverse()), indicator: flag};
        }
            case  'Filter_Company': {
                let sort = state.userData.sort((a, b) => a.company.name > b.company.name ? 1 : a.company.name < b.company.name ? -1 : 0)
                let flag: FlagType = state.indicator === 'FilterCompany' ? '' : 'FilterCompany'
                return {...state, userData: (state.indicator !== 'FilterCompany' ? sort : sort.reverse()), indicator: flag};
            }
        default:
            return state;
    }
}
const setUsersAC = (payload: UsersStateType[]) => ({type: "Set_Users", payload} as const)
export const setLoadAC = (payload: FlagType) => ({type: "Set_Load", payload} as const)
export const openProfileAC = (payload: { profile: InfoUserType, id?: number }) => ({type: "OpenProfile",payload} as const)
export const filterCityAC = () => ({type: "Filter_City"} as const)
export const filterCompanyAC = () => ({type: "Filter_Company"} as const)

export const SetUsersTC = () => (dispatch: ThunkDispatch<AppStateType, unknown, AC_Type>) => {
    dispatch(setLoadAC('load'))
    usersAPI.getContacts()
        .then(res => dispatch(setUsersAC(res.data)))
        .catch(err => alert('try letter'))
        .finally(() => dispatch(setLoadAC('loaded')))
}


export default userReducer