import style from './Button.module.scss'

type ButtonPropsType = {
    title: string
    width: string
    zIndex?: string
    disabled?: boolean
    color?: string
    callback?: (title?: string) => void
}

export const Button = (props: ButtonPropsType) => {
    const {title, width, color} = props
    const zIndex = props.zIndex ? props.zIndex : '0'
    let disabled = props.disabled ? props.disabled : false
    let id = title === 'Назад' ? 'Back' : 'Button'
    const onClickHandler = () => {
      props.callback && props.callback(title)
    }
    return <>
        <button className={style.buttonStyle} id={id}
                style={{width:`${width}`, zIndex:`${zIndex}`, backgroundColor: `${color}`}}
                disabled={disabled} onClick={onClickHandler}>
            {title}
        </button>
    </>
}