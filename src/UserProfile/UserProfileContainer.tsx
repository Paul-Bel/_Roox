import style from './UserProfile.module.scss'
import {Button} from "../common/components/Button/Button";
import {FlagType, UsersStateType} from "../Redux/reducer";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {AlertSuccess} from "../common/components/Alert/AlertSuccess";
import {Input} from "../common/components/Input/Input";

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

export const UserProfileContainer = (props: UserProfilePropsType) => {

    const disabled = props.disable
    const userData = {...props.state}
    //данные для отрисовки инпутов формы
    const editUser: Array<EditeStateType> = [
        {name: 'name', title: 'Name', nameInp: 'name', type: 'text', data: userData.name},
        {name: 'username', title: 'User name', nameInp: 'user_name', type: 'text', data: userData.username},
        {name: 'email', title: 'E-mail', nameInp: 'email', type: 'text', data: userData.email},
        {name: 'street', title: 'Street', nameInp: 'street', type: 'text', data: userData.address.street},
        {name: 'city', title: 'City', nameInp: 'city', type: 'text', data: userData.address.city},
        {name: 'zipcode', title: 'Zip code', nameInp: 'zip_code', type: 'text', data: userData.address.zipcode},
        {name: 'phone', title: 'Phone', nameInp: 'phone', type: 'text', data: userData.phone},
        {name: 'website', title: 'Website', nameInp: 'website', type: 'text', data: userData.website},]

    //даннык для дефолтного value формы инпутов
    let defaultValue = editUser.reduce((acc, el) => {
        acc[el.name as keyof InputsType] = el.data
        return acc
    }, {} as InputsType)
    // сабмит формы
    const onSubmit: SubmitHandler<InputsType> = data => {
        console.log('reactForm11', getValues())
        // рисуем алерт
        props.callback('submit')
    };
    const {register, handleSubmit, formState: {errors}, getValues} = useForm<InputsType>({
        defaultValues : {...defaultValue, }
    });

    return (
        <div className={style.profileContainer}>
            <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)} id={'form'}>

                {/*отрисовываем инпуты*/}

                {editUser.map(el => <Input
                    key={el.name} type={el.type} name={el.name} title={el.title} register={register}
                    disabled={disabled} errors={!!errors[el.name as keyof InputsType]}/>)}

                {/*алерт при успешном редактировании*/}

                {!props.indicator && <AlertSuccess submit={getValues()} />}
                <label className={style.labelName}>Comment<br/>
                    <textarea className={style.textAriaInput} disabled={disabled}
                              {...register("textAria", {required: true, maxLength: 150})}
                    />
                </label>
                <div className={style.button}>
                    <Button title={disabled ? 'Назад' : 'Отправить'} width={'85px'}
                            color={!disabled ? '#52CF4F' : '#AFAFAF'} callback={props.callback}/>
                </div>
            </form>
        </div>

    )//
}