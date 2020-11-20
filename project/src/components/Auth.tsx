import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Link, Redirect, useRouteMatch } from 'react-router-dom'
import { User } from '../local/interfaces';
import { users } from '../local/localdb';
import { ValidationStatus } from '../local/validationStatus';
import style from './css/modal-form.module.css'

interface Props {
    login:(user:User)=>void,
    cancel:()=>void,
    regUser?:ValidationStatus,
    authUser?:ValidationStatus,
}

export default function Auth({login, cancel, regUser, authUser}: Props): ReactElement {
    const email = useRef<HTMLInputElement>(null);
    let user:User = {id:"", name:"", email:"",password:""};
    let match = useRouteMatch();

    useEffect(() => {
        email.current?.focus();
    }, [])

    return (
        <>
        {regUser!=ValidationStatus.NOTVALID?
            <div className={style.back}>
                <div className={style.box}>
                        <h2>Log in</h2>
                        {authUser===ValidationStatus.NOTVALID && <div className={style.warning}>Try Again</div>}
                        <div className={style.form}>
                            <input type="email" ref={email} placeholder='Enter email' onChange={(e)=>{user.email=e.target.value}}/>
                            <input type="password" placeholder='Enter password' onChange={(e)=>{user.password=e.target.value}}/>
                            <div className={style.buttons}>
                                <Link to={`/profile`} ><button onClick={()=>login(user)} className='btn btn-accept'>Log in</button></Link>
                                <Link to='/'><button onClick={()=>cancel()} className='btn btn-reject'>Cancel</button></Link>
                            </div>
                        </div>
                </div>
            </div>
            :
            <div>
                <Redirect to='/registration'/>
            </div>
            }
        </>
    )
}

