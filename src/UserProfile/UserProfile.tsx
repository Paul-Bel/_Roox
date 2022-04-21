import style from './UserProfile.module.scss'
import {Button} from "../common/components/Button/Button";
import {FlagType, UsersStateType} from "../Redux/reducer";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {AlertSuccess} from "./AlertSuccess";

type EditeStateType = { name: string, title: string, nameInp: string, type: string, data: string }
type UserProfilePropsType = {
    disable: boolean
    state: UsersStateType
    callback: (name: string) => void
    indicator: FlagType
}
export type InputsType = {
    name: string, username: string, email: string, street: string,
    city: string, zipcode: string, phone: string, website: string, textAria: string
};

export const UserProfile = (props: UserProfilePropsType) => {


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
    const [submit, setSabmit] = useState<InputsType>()
    //data for form
    let defaultValue = editUser.reduce((acc, el) => {
        acc[el.name as keyof InputsType] = el.data
        return acc
    }, {} as InputsType)
    // console.log('defaultValue', defaultValue)
    const onSubmit: SubmitHandler<InputsType> = data => {
        setSabmit(data)
        console.log('reactForm', getValues())
        console.log('reactForm11', data)
    };
    const {register, handleSubmit, watch, formState: {errors}, getValues} = useForm<InputsType>({
        defaultValues : {...defaultValue, textAria: ''}
    });
    //
    const disabled = props.disable
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, name: string) => {
        setEditUser(editUser.map((el) => {
            return el.name === name ? ({...el, data: e.currentTarget.value}) : el
        }))
    }

    let InputData = editUser.map(inp => {
        return <label key={inp.name} className={style.labelName}>{inp.title}<br/>
            <input
                className={style.inputType} style={errors[inp.name as keyof InputsType] && {border: '1px solid red'}}type={inp.type}
                disabled={disabled} {...register(inp.name as keyof InputsType, {required: true, maxLength: 100})}
            />
            {errors[inp.name as keyof InputsType] && <p>This field is required</p>}
        </label>
    })
    return (
        <div className={style.profileContainer}>
            <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)} id={'form'}>
                {InputData}
                {!props.indicator && <AlertSuccess submit={defaultValue} />}
                <label className={style.labelName}>Comment<br/>
                    <textarea className={style.textAriaInput} disabled={disabled} name={'textAria'} />
                </label>
                <div className={style.button}>
                    <Button title={disabled ? 'Назад' : 'Отправить'} width={'85px'}
                            color={!disabled ? '#52CF4F' : '#AFAFAF'} callback={props.callback}/>
                </div>
            </form>
        </div>

    )//
}