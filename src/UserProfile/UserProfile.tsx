import style from './UserProfile.module.scss'
import {Button} from "../common/components/Button/Button";
import {UsersStateType} from "../Redux/reducer";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";

type EditeStateType = {name: string, title: string, nameInp: string, type: string, data: string}
type UserProfilePropsType = {
    disable: boolean
    state: UsersStateType
    callback: (e: React.SyntheticEvent ) => void
}

export const UserProfile = (props: UserProfilePropsType) => {
    const userData = {...props.state}
    const [editUser, setEditUser] = useState<Array<EditeStateType>>([])
    useEffect(() => {
        setEditUser([
            {name: 'name', title: 'Name', nameInp: 'name', type: 'text', data: userData.name},
            {name: 'username', title: 'User name', nameInp: 'user_name', type: 'text', data: userData.username},
            {name: 'email', title: 'E-mail', nameInp: 'email', type: 'text', data: userData.email},
            {name: 'street', title: 'Street', nameInp: 'street', type: 'text', data: userData.address.street},
            {name: 'city', title: 'City', nameInp: 'city', type: 'text', data: userData.address.city},
            {name: 'zipcode', title: 'Zip code', nameInp: 'zip_code', type: 'number', data: userData.address.zipcode},
            {name: 'phone', title: 'Phone', nameInp: 'phone', type: 'number', data: userData.phone},
            {name: 'website', title: 'Website', nameInp: 'website', type: 'url', data: userData.website},])
    }, [props.state])

    const disabled = props.disable
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, name: string) => {
        // @ts-ignore
        setEditUser(editUser.map(el => el.nameInp === name ? (el.data = e.currentTarget.value )as const : el))
    }
    const sendHandler = (e: FormEvent<HTMLFormElement>) => {
        let state = editUser.filter(el => el.name)

        console.log(JSON.parse(state))
    }
    let InputData = editUser.map(inp => {
        return <label className={style.labelName}>{inp.title}<br/>
                    <input value={inp.data} onChange={(e)=>onChangeHandler(e, inp.nameInp)}
                        className={style.inputType} type={inp.type} name={inp.nameInp}
                        required disabled={disabled}/>
                </label>
    })
    return (
        <div className={style.profileContainer}>
            <form className={style.formContainer} onSubmit={sendHandler} id={'form'}>
                {InputData}
                <label className={style.labelName}>Comment<br/><textarea className={style.textAriaInput} disabled={disabled} name={'textAria'}/></label>
                <div className={style.button} onClick={props.callback}>
                    <Button title={disabled ? 'Назад':'Отправить'} width={'85px'} color={!disabled?'#52CF4F':'#AFAFAF'} callback={}/>
                </div>
            </form>
        </div>

    )
}