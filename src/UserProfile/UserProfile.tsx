import style from './UserProfile.module.scss'
import {Button} from "../common/components/Button/Button";
import {UsersStateType} from "../Redux/reducer";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type EditeStateType = {name: string, title: string, nameInp: string, type: string, data: string}
type UserProfilePropsType = {
    disable: boolean
    state: UsersStateType
    callback: (name:string ) => void
}

type InputsType = {name: string, username: string, email: string, street: string,
    city: string, zipcode: string, phone: string, website: string,};

export const UserProfile = (props: UserProfilePropsType) => {
    const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm<InputsType>({
        defaultValues: {
            name: "",
            username: "fhgvdsjh"
        }
    });
    const onSubmit: SubmitHandler<InputsType> = data => console.log('reactForm',getValues());

    const userData = {...props.state}
    const [editUser, setEditUser] = useState<Array<EditeStateType>>([
        {name: 'name', title: 'Name', nameInp: 'name', type: 'text', data: userData.name},
        {name: 'username', title: 'User name', nameInp: 'user_name', type: 'text', data: userData.username},
        {name: 'email', title: 'E-mail', nameInp: 'email', type: 'text', data: userData.email},
        {name: 'street', title: 'Street', nameInp: 'street', type: 'text', data: userData.address.street},
        {name: 'city', title: 'City', nameInp: 'city', type: 'text', data: userData.address.city},
        {name: 'zipcode', title: 'Zip code', nameInp: 'zip_code', type: 'text', data: userData.address.zipcode},
        {name: 'phone', title: 'Phone', nameInp: 'phone', type: 'text', data: userData.phone},
        {name: 'website', title: 'Website', nameInp: 'website', type: 'text', data: userData.website},])


    const disabled = props.disable
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, name: string) => {
        setEditUser(editUser.map((el) => {
            console.log('test',editUser)
            return el.name === name ? ({...el, data: e.currentTarget.value}) : el
        }))
    }
    const sendHandler = (e: FormEvent<HTMLFormElement>) => {
        let data = new FormData(e.currentTarget)
        let state = editUser.filter(el => el.name)
        console.log('submit', data)
        e.preventDefault()
        // console.log(JSON.parse(state))
    }
    let InputData = editUser.map(inp => {
        return <label key={inp.name} className={style.labelName}>{inp.title}<br/>
                    <input defaultValue={inp.data}
                        className={style.inputType} type={inp.type}
                        disabled={disabled} {...register(inp.name as keyof InputsType , { required: false, maxLength: 10 })}
                        value={inp.data}
                        onChange={(e)=>onChangeHandler(e, inp.name)}

                    />
            {errors[inp.name as keyof InputsType] && <p>This field is required</p>}
                </label>
    })
    return (
        <div className={style.profileContainer}>
            <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)} id={'form'}>
                {InputData}
                <label className={style.labelName}>Comment<br/><textarea className={style.textAriaInput} disabled={disabled} name={'textAria'}/></label>
                <div className={style.button} >
                    <input type="submit" />
                    <Button title={disabled ? 'Назад':'Отправить'} width={'85px'} color={!disabled?'#52CF4F':'#AFAFAF'} callback={props.callback}/>
                </div>
            </form>
        </div>

    )//
}