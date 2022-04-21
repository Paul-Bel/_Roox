import style from './UserProfile.module.scss'
import {InputsType} from "./UserProfile";
import {useEffect} from "react";

type AlertSuccessType = {
    submit?: InputsType
}

export const AlertSuccess = (props: AlertSuccessType) => {
    useEffect(() => {

    },[])
    return (
        <div className={style.alert}>
            Данные отправлены, посмотрите в консоль или здесь:
            <div className={style.submit}>{JSON.stringify(props.submit).replace(/,/g, ', ')}</div>
        </div>
    )
}

// {"submit":{"name":"Ervin Howell","username":"Antonette","email":"Shanna@melissa.tv","street":"Victor Plains","city":"Wisokyburgh","zipcode":"90566-7771","phone":"010-692-6593 x09125","website":"anastasia.net"}}