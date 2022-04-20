import style from './FilterNav.module.scss'
import {Button} from "../Button/Button";
import {useAppDispatch} from "../../../Redux/hooks";
import {filterCityAC, filterCompanyAC} from "../../../Redux/reducer";

const elementButton = [
    {id: 1, title: 'по городу', width: '86.13px'},
    {id: 2, title: 'по компании', width: '105.39px'}]

export const FilterNav = () => {
    const dispatch = useAppDispatch()
    const onClickHandler = (title: string) => (title === 'по городу')? dispatch(filterCityAC()) : dispatch(filterCompanyAC())
    const ButtonForFilter = elementButton.map((el) => <Button key={el.id} title={el.title} width={el.width} callback={onClickHandler}/>)
    return <div className={style.filterContainer}>
        <label className={style.title}>Сортировка</label><br/>
        {ButtonForFilter}
    </div>
}