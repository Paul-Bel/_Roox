import style from './UserProfile.module.scss'
import {Button} from "../common/components/Button/Button";
import {UsersStateType} from "../Redux/reducer";
import React from "react";


type UserProfilePropsType = {
    disable: boolean
    state: UsersStateType
}

export const UserProfile = (props: UserProfilePropsType) => {
    const userData = {...props.state}
    let infoOfUser = [
        {title: 'Name', nameInp: 'name', type: 'text', data: userData.name},
        {title: 'User name', nameInp: 'user_name', type: 'text', data: userData.username},
        {title: 'E-mail', nameInp: 'email', type: 'text', data: userData.email},
        {title: 'Street', nameInp: 'street', type: 'text', data: userData.address.street},
        {title: 'City', nameInp: 'city', type: 'text', data: userData.address.city},
        {title: 'Zip code', nameInp: 'zip_code', type: 'number', data: userData.address.zipcode},
        {title: 'Phone', nameInp: 'phone', type: 'number', data: userData.phone},
        {title: 'Website', nameInp: 'website', type: 'url', data: userData.website},
    ]
    const disabled = props.disable

    let InputData = infoOfUser.map(inp => {
        return <label className={style.labelName}>{inp.title}<br/>

                    <input value={inp.data}
                        className={style.inputType} type={inp.type} name={inp.nameInp}
                        required disabled={disabled}/>
                </label>
    })
    return (
        <div className={style.profileContainer}>
            <form className={style.formContainer}>
                {InputData}
                <label className={style.labelName}>Comment<br/><textarea className={style.textAriaInput}/></label>
                <div className={style.button}>
                    <Button title={disabled ? 'Назад':'Отправить'} width={'85px'} color={!disabled?'#52CF4F':'#AFAFAF'}/>
                </div>
            </form>
        </div>

    )
}