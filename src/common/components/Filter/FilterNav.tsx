import style from './FilterNav.module.scss'
import {Button} from "../Button/Button";

const elementButton = [
    {title: 'по городу', width: '86.13px'},
    {title: 'по компании', width: '105.39px'}]
const ButtonForFilter = elementButton.map((el, i) => <Button key={i} title={el.title} width={el.width}/>)

export const FilterNav = () => {
    return <div className={style.filterContainer}>
        <label className={style.title}>Сортировка</label><br/>
        {ButtonForFilter}
    </div>
}