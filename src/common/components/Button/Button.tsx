import style from './Button.module.scss'

type ButtonPropsType = {
    title: string
    width: string
    zIndex?: string
    disabled?: boolean
}

export const Button = (props: ButtonPropsType) => {
    const {title, width} = props
    const zIndex = props.zIndex ? props.zIndex : '0'
    return <>
        <button className={style.buttonStyle} style={{width: `${width}`, zIndex: `${zIndex}`}}>
            {title}
        </button>

    </>
}