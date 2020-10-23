import React, { ReactElement, useContext,} from 'react'
import { Redirect,  } from 'react-router-dom'
import {CurrentUser} from '../App';
import style from './css/profile.module.css';
import userImg from '../images/user.svg'

interface Props {

}

export default function Profile({}: Props): ReactElement {
    const curUser = useContext(CurrentUser);

    return (
        <div className={style.main}>
        <div className={style.header}>
            <div>Profile</div>
        </div>
            {curUser.id?
            <div className={style.box}>
                <div className={style.box_inner} >
                    <div className={style.info} >ID: <span className={style.info_value}>{curUser.id}</span></div>
                    <div className={style.info} >Name: <span className={style.info_value}>{curUser.name}</span></div>
                    <div className={style.info}>Email: <span className={style.info_value}>{curUser.email}</span></div>
                    <div className={style.info} >Password: <span className={style.info_value}>{curUser.password}</span></div>
                    <div className={style.info} >Number of subscribed groups: <span className={style.info_value}>{curUser.groups?.length}</span></div>
                </div>
                <div><img className={style.img} src={userImg}/></div>
            </div>
            :
            <>
                <Redirect to='/login'/>
            </>
            }
        </div>
    )
}
