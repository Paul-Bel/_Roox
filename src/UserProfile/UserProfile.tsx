import style from './UserProfile.module.scss'
import {Button} from "../common/components/Button/Button";

export const UserProfile = () => {

    return (
<div className={style.profileContainer}>
    <form className={style.formContainer}>
        <label className={style.labelName}>Name<br/>
            <input className={style.inputType} disabled={false} value={"Test"}
                   type="text" name={"Name"} required/></label>
        <label className={style.labelName} >User name<br/>
            <input className={style.inputType}
                   type="text" name={"User name"} required/></label>
        <label className={style.labelName}>E-mail<br/>
            <input className={style.inputType}
                   type="email" name={"name"} required/></label>
        <label className={style.labelName}>Street<br/>
            <input className={style.inputType}
                   type="text" name={"Street"} required/></label>
        <label className={style.labelName}>City<br/>
            <input className={style.inputType}
                   type="text" name={"City"} required/></label>
        <label className={style.labelName}>Zip code<br/>
            <input className={style.inputType}
                   type="number" name={"Zip code"} required/></label>
        <label className={style.labelName}>Phone<br/>
            <input className={style.inputType}
                   type="phone" name={"Phone"} required/></label>
    <label className={style.labelName}>Website<br/>
            <input className={style.inputType}
                   type="url" name={"Website"} required/></label>

<label>Comment<br/><textarea className={style.textAriaInput}/></label>

    <Button title={'Отправить'} width={'85px'}/>

    </form>
</div>

    )
}