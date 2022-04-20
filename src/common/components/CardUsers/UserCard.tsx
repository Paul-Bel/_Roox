import style from './UserCard.module.scss'

type UserCardPropsType = {
    name: string
    city: string
    company: string
    callback: () => void
}
export const UserCard = (props: UserCardPropsType) => {
    const {name, city, company, callback} = props
    return (
        <div className={style.cardContainer}>
            <ul>
                <li>ФИО: <span className={style.dataUser}>{name}</span></li>
                <li>город:<span className={style.dataUser}>{city}</span></li>
                <li>компания: <span className={style.dataUser}>{company}</span></li>
            </ul>
            <a href="#" onClick={callback}>Подробнее</a>
        </div>
    )
}