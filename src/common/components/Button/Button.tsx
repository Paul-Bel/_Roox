import style from './Button.module.scss'
import React from 'react'

interface ButtonPropsType extends React.HTMLAttributes<HTMLButtonElement> {
    title: string
    width: string
    zIndex?: string
    color?: string
    callback?: (title: string) => void
}


export const Button: React.FC<ButtonPropsType> = ({title, width, zIndex, color, callback, ...rest}) => {

    let id = title === 'Назад' ? 'Back' : 'Button'
    const onClickHandler = () => {
        callback && callback(title)
    }
    return <>
        <button className={style.buttonStyle} id={id}
                style={{width: `${width}`, zIndex: `${zIndex || 0}`, backgroundColor: `${color}`}}
              onClick={onClickHandler}  {...rest}>
            {title}
        </button>
    </>
}