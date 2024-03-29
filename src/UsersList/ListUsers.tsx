import style from './ListUsers.module.scss'
import {UserCard} from "./CardUsers/UserCard";
import {Preloader} from "../common/Preloader/Preloader";
import {useSelector} from "react-redux";
import {AppStateType} from "../Redux/store";
import {
    ButtonNamesType,
    FlagType,
    InfoUserType,
    InitialStateType,
    openProfileAC,
    setLoadAC,
    SetUsersTC
} from "../Redux/reducer";
import {Button} from "../common/components/Button/Button";
import {useAppDispatch} from "../Redux/hooks";
import {UserProfileContainer} from "../UserProfile/UserProfileContainer";
import React, {useEffect} from "react";

const titleName = {user: "Профиль пользоваетеля", users: "Список пользователей"}
export const ListUsers = () => {
    const {ButtonEdit, ButtonBack, ButtonSend, ButtonCancel} = useSelector<AppStateType, ButtonNamesType>(store => store.users.buttonNames)
    const dispatch = useAppDispatch()
    const state = useSelector<AppStateType, InitialStateType>(store => store.users)
    const indicator = useSelector<AppStateType, FlagType>(store => store.users.indicator)
    const profile = useSelector<AppStateType, InfoUserType>(store => store.users.profileIsOpen)

    //первая отрисовка юзеров
    useEffect(() => {
        dispatch(SetUsersTC())
    }, [])

    //отображение кнопки редактирования путем установки z-index
    const editButton = profile === titleName.user as InfoUserType ? "0" : "-1"
    const addEditButton = (id: number) => dispatch(openProfileAC({profile: titleName.user as InfoUserType, id}))

    // смена экранов по кликам кнопки
    const onClickHandler = (name?: string) => {
        if (name !== ButtonBack) {
            dispatch(setLoadAC((indicator !== 'editProfile' ? 'editProfile' : 'loaded')))
        }

        if (name === ButtonBack) {
            dispatch(openProfileAC({profile: titleName.users as InfoUserType}))
            dispatch(SetUsersTC())
        }

        if (name === (ButtonSend+'send')) {
            dispatch(setLoadAC(('Send')))
            setTimeout(() => {
                dispatch(openProfileAC({profile: titleName.users as InfoUserType}))
                dispatch(SetUsersTC())
            }, 8000)
        }
    }
    // отрисовка карточек контактов
    const usersCards = state.userData?.map(user => {
        return <UserCard
            key={user.id} name={user.name} city={user.address.city} company={user.company.name}
            id={user.id} callback={addEditButton}/>
    })
    // включение прелоадера
    if (indicator === 'load') {
        return <div className={style.userContainer}><Preloader/></div>
    }
    return (
        <div className={style.userContainer}>
            <header className={style.header}>
                <label className={style.title} id={"title"}>{profile}</label>
                <Button title={indicator === 'editProfile' ? ButtonCancel : ButtonEdit}
                        width={'116.67px'} color={indicator === 'editProfile' ? '#AFAFAF' : ''}
                        zIndex={editButton} callback={onClickHandler}/>
            </header>
            {profile === titleName.user as InfoUserType
                ? <UserProfileContainer disable={indicator !== 'editProfile'}
                                        state={state.userData[0]} ButtonName={{ButtonBack, ButtonSend}}
                                        callback={onClickHandler} indicator={indicator}/>
                : <>
                    {usersCards}
                    <div className={style.totalUsers}>Найдено {state.userData?.length} пользователей</div>
                </>}
        </div>
    )
}

