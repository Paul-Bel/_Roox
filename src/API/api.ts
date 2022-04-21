import axios from "axios";
import {UsersStateType} from "../Redux/reducer";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
})
export const usersAPI = {
    getContacts() {
        return instance.get<UsersStateType[]>(`users`)
    },
}