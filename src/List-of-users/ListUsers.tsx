import style from './ListUsers.module.scss'
import {UserCard} from "../common/components/CardUsers/UserCard";
import {Preloader} from "../common/Preloader/Preloader";
import {useSelector} from "react-redux";
import {AppStateType} from "../Redux/store";
import {FlagType, InfoUserType, openProfileAC, setLoadAC, UsersStateType} from "../Redux/reducer";
import {Button} from "../common/components/Button/Button";
import {useAppDispatch} from "../Redux/hooks";
import {UserProfile} from "../UserProfile/UserProfile";
import React, {MouseEvent} from "react";

export const ListUsers = () => {
    const distatch = useAppDispatch()

    const state = useSelector<AppStateType, Array<UsersStateType>>(store => store.users.userData)
    const loading = useSelector<AppStateType, FlagType>(store => store.users.load)
    const profile = useSelector<AppStateType, InfoUserType>(store => store.users.profileIsOpen)
    const editButton = profile === "Профиль пользоваетля" ? "0" : "-1"
    const addEditButton = (id: number) => {
        distatch(openProfileAC({profile: "Профиль пользоваетля", id}))
    }
    const onClickHandler = (e: React.SyntheticEvent ) => {
        let target = e.target as HTMLInputElement;
        if(target.id === "Button"){
            distatch(setLoadAC((loading !== 'editProfile' ?'editProfile': 'loaded')))
        }
    }
    const usersCards = state?.map(user => {
        return <UserCard
            key={user.id} name={user.name} city={user.address.city} company={user.company.name}
            id={user.id} callback={addEditButton}/>
    })
    if(loading === 'load') {return <div className={style.userContainer}><Preloader/></div>}
    return (
        <div className={style.userContainer}>
            <header className={style.header} onClick={onClickHandler}><label className={style.title} id={"title"}>{profile}</label>
            <Button title={loading==='editProfile'? 'Отмена':'Редактироввать'} width={'116.67px'} color={loading==='editProfile'?'#AFAFAF':''} zIndex={editButton} />
            </header>
            {profile === "Профиль пользоваетля"
            ? <UserProfile disable={loading!=='editProfile'} state={state[0]}/>
            :<>{usersCards}
            <div className={style.totalUsers}>Найдено {state?.length} пользователей</div></>
            }


        </div>
    )
}

