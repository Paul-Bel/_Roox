import style from './ListUsers.module.scss'
import {UserCard} from "../common/components/CardUsers/UserCard";
import {Preloader} from "../common/Preloader/Preloader";
import {useSelector} from "react-redux";
import {AppStateType} from "../Redux/store";
import {FlagType, InfoUserType, InitialStateType, openProfileAC, setLoadAC, SetUsersTC, UsersStateType} from "../Redux/reducer";
import {Button} from "../common/components/Button/Button";
import {useAppDispatch} from "../Redux/hooks";
import {UserProfile} from "../UserProfile/UserProfile";
import React from "react";

export const ListUsers = () => {
    const dispatch = useAppDispatch()
    const state = useSelector<AppStateType, InitialStateType>(store => store.users)
    const loading = useSelector<AppStateType, FlagType>(store => store.users.load)
    const profile = useSelector<AppStateType, InfoUserType>(store => store.users.profileIsOpen)
    const editButton = profile === "Профиль пользоваетля" ? "0" : "-1"
    const addEditButton = (id: number) => {
        dispatch(openProfileAC({profile: "Профиль пользоваетля", id}))
    }
    const onClickHandler = (e: React.SyntheticEvent ) => {
        let target = e.target as HTMLInputElement;
        if(target.id === "Button"){
            dispatch(setLoadAC((loading !== 'editProfile' ?'editProfile': 'loaded')))
        }
        if(target.id === "Back"){
            e.preventDefault()
            dispatch(openProfileAC({profile: "Список пользователей"}))
            dispatch(SetUsersTC())
        }
    }
    const usersCards = state.userData?.map(user => {
        return <UserCard
            key={user.id} name={user.name} city={user.address.city} company={user.company.name}
            id={user.id} callback={addEditButton}/>
    })
    if(loading === 'load') {return <div className={style.userContainer}><Preloader/></div>}
    console.log('users')
    return (
        <div className={style.userContainer}>
            <header className={style.header} onClick={onClickHandler}><label className={style.title} id={"title"}>{profile}</label>
            <Button title={loading==='editProfile'? 'Отмена':'Редактироввать'}
                    width={'116.67px'} color={loading==='editProfile'?'#AFAFAF':''} zIndex={editButton} />
            </header>
            {profile === "Профиль пользоваетля"
            ? <UserProfile disable={loading!=='editProfile'} state={state.userData[0]} callback={onClickHandler}/>
            :<>{usersCards}
            <div className={style.totalUsers}>Найдено {state.userData?.length} пользователей</div></>
            }


        </div>
    )
}

