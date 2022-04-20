import style from './ListUsers.module.scss'
import {UserCard} from "../common/components/CardUsers/UserCard";
import {Preloader} from "../common/Preloader/Preloader";
import {useSelector} from "react-redux";
import {AppStateType} from "../Redux/store";
import {InfoUserType, openProfileAC, UsersStateType} from "../Redux/reducer";
import {Button} from "../common/components/Button/Button";
import {useAppDispatch} from "../Redux/hooks";
import {UserProfile} from "../UserProfile/UserProfile";
import React from "react";

export const ListUsers = () => {
    const distatch = useAppDispatch()
    const state = useSelector<AppStateType, Array<UsersStateType>>(store => store.users.userData)
    const loading = useSelector<AppStateType, boolean>(store => store.users.load)
    const profile = useSelector<AppStateType, InfoUserType>(store => store.users.profileIsOpen)
    const addEditButton = () => {

        distatch(openProfileAC("Профиль пользоваетля"))
    }
    const editButton = profile === "Профиль пользоваетля" ? "-1" : "0"
    const usersCards = state?.map(user => {
        return <UserCard
            key={user.id} name={user.name} city={user.address.city} company={user.company.name}
        callback={addEditButton}/>
    })
    if(loading) {return <div className={style.userContainer}><Preloader/></div>}
    return (
        <div className={style.userContainer}>
            <header className={style.header}><label className={style.title}>{profile}</label>
            <Button title={'Редактироввать'} width={'116.67px'} zIndex={editButton}/>


            </header>
            <UserProfile/>

            {/*{usersCards}*/}
            {/*<div className={style.totalUsers}>Найдено {state?.length} пользователей</div>*/}
        </div>
    )
}

