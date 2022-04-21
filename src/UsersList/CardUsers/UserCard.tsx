import style from './UserCard.module.scss'
import {MouseEvent} from "react";

type UserCardPropsType = {
    id: number
    name: string
    city: string
    company: string
    callback: (id: number) => void
}
export const UserCard = (props: UserCardPropsType) => {
    const {id, name, city, company, callback} = props
    const onClickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        callback(id)
    }
    return (
        <div className={style.cardContainer}>
            <ul>
                <li>ФИО: <span className={style.dataUser}>{name}</span></li>
                <li>город:<span className={style.dataUser}>{city}</span></li>
                <li>компания: <span className={style.dataUser}>{company}</span></li>
            </ul>
            <a onClick={onClickHandler}>Подробнее</a>
        </div>
    )
}