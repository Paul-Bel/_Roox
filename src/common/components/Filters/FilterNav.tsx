import style from './FilterNav.module.scss'
import {Button} from "../Button/Button";
import {useAppDispatch} from "../../../Redux/hooks";
import {ButtonNamesType, filterCityAC, filterCompanyAC} from "../../../Redux/reducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../Redux/store";

type ButtonType = { id: number, title: string, width: string }

export const FilterNav = () => {
    const {ButtonFindCity, ButtonFindCompany} = useSelector<AppStateType, ButtonNamesType>(store => store.users.buttonNames)
    const elementButton: ButtonType[] = [
        {id: 1, title: ButtonFindCity, width: '86.13px'},
        {id: 2, title: ButtonFindCompany, width: '105.39px'}]

    const dispatch = useAppDispatch()
    //сортировка
    const onClickHandler = (title: string) => (title === ButtonFindCity) ? dispatch(filterCityAC()) : dispatch(filterCompanyAC())
    const ButtonForFilter = elementButton
        .map((el) => <Button key={el.id} title={el.title} width={el.width} callback={onClickHandler}/>)
    return (
        <div className={style.filterContainer}>
            <label className={style.title}>Сортировка</label><br/>
            {ButtonForFilter}
        </div>)
}