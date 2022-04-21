import style from './ListUsers.module.scss'
import {UserCard} from "../common/components/CardUsers/UserCard";
import {Preloader} from "../common/Preloader/Preloader";
import {useSelector} from "react-redux";
import {AppStateType} from "../Redux/store";
import {FlagType, InfoUserType, InitialStateType, openProfileAC, setLoadAC, SetUsersTC} from "../Redux/reducer";
import {Button} from "../common/components/Button/Button";
import {useAppDispatch} from "../Redux/hooks";
import {UserProfile} from "../UserProfile/UserProfile";
import React, {useEffect} from "react";

export const ListUsers = () => {
    const dispatch = useAppDispatch()

    const state = useSelector<AppStateType, InitialStateType>(store => store.users)
    const indicator = useSelector<AppStateType, FlagType>(store => store.users.indicator)
    const profile = useSelector<AppStateType, InfoUserType>(store => store.users.profileIsOpen)
    useEffect(() => {
        dispatch(SetUsersTC())
    }, [])
    const editButton = profile === "Профиль пользоваетля" ? "0" : "-1"
    const addEditButton = (id: number) => {
        dispatch(openProfileAC({profile: "Профиль пользоваетля", id}))
    }
    const onClickHandler = (name?: string) => {
        if (name !== "Назад")
            dispatch(setLoadAC((indicator !== 'editProfile' ? 'editProfile' : 'loaded')))

        if (name === "Назад") {
            dispatch(openProfileAC({profile: "Список пользователей"}))
            dispatch(SetUsersTC())
        }
        if (name === "Отправить") {
            dispatch(setLoadAC(('')))
            setTimeout(() => {
                dispatch(openProfileAC({profile: "Список пользователей"}))
                dispatch(SetUsersTC())
            }, 1000)

        }

    }
    const usersCards = state.userData?.map(user => {
        return <UserCard
            key={user.id} name={user.name} city={user.address.city} company={user.company.name}
            id={user.id} callback={addEditButton}/>
    })
    if (indicator === 'load') {
        return <div className={style.userContainer}><Preloader/></div>
    }
    return (
        <div className={style.userContainer}>
            <header className={style.header}><label className={style.title} id={"title"}>{profile}</label>
                <Button title={indicator === 'editProfile' ? 'Отмена' : 'Редактироввать'}
                        width={'116.67px'} color={indicator === 'editProfile' ? '#AFAFAF' : ''}
                        zIndex={editButton} callback={onClickHandler}/>
            </header>
            {profile === "Профиль пользоваетля"
                ?
                <UserProfile disable={indicator !== 'editProfile'} state={state.userData[0]} callback={onClickHandler} indicator={indicator}/>
                : <>{usersCards}
                    <div className={style.totalUsers}>Найдено {state.userData?.length} пользователей</div>
                </>
            }


        </div>
    )
}

