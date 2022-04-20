import style from './MainContainer.module.scss'
import {FilterNav} from "../common/components/Filter/FilterNav";
import {ListUsers} from '../List-of-users/ListUsers';
import React, {useEffect} from "react";
import {SetUsersTC} from "../Redux/reducer";
import {useAppDispatch} from "../Redux/hooks";
import {UserProfile} from "../UserProfile/UserProfile";

export const MainContainer = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(SetUsersTC())
    },[])

    return (
        <div className={style.MainContainer}>
            <FilterNav/>
            <ListUsers/>

        </div>
    )
}