import style from './Button.module.scss'

type ButtonPropsType = {
    title: string
    width: string
    zIndex?: string
    disabled?: boolean
    color?: string
}

export const Button = (props: ButtonPropsType) => {
    const {title, width, color} = props
    const zIndex = props.zIndex ? props.zIndex : '0'
    let disabled = props.disabled ? props.disabled : false
    return <>
        <button className={style.buttonStyle} id={'Button'}
                style={{width:`${width}`, zIndex:`${zIndex}`, backgroundColor: `${color}`}}
                disabled={disabled}>
            {title}
        </button>

    </>
}