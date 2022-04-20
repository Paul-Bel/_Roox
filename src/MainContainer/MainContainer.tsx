import style from './MainContainer.module.scss'
import {FilterNav} from "../common/components/Filter/FilterNav";
import {ListUsers} from '../List-of-users/ListUsers';


 const MainContainer = () => {


    return (
        <div className={style.MainContainer}>
            <ListUsers/>


        </div>
    )
}