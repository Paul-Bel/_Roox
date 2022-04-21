import style from './Input.module.scss'
import {UseFormRegister} from "react-hook-form";
import {InputsType} from '../../../UserProfile/UserProfileContainer';


type InputPropsType = {
    title: string
    errors: boolean
    type: string
    disabled: boolean
    name: string
    register: UseFormRegister<InputsType>
}
export const Input = (props: InputPropsType) => {
    const {title, errors, type, disabled, name, register} = props

    return (
        <label className={style.labelName}>{title}<br/>
            <input
                className={style.inputType} style={errors ? {border: '1px solid red'} : undefined}
                type={type}
                disabled={disabled} {...register(name as keyof InputsType, {
                required: true,
                maxLength: 25,
                minLength: 1
            })}
            />
        </label>

    )//
}