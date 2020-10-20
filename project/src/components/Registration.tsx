import React, { ReactElement, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../local/interfaces';
import { ValidationStatus } from '../local/validationStatus';
import style from './css/modal-form.module.css'

interface Props {
    registrate:(newUser:User)=>void,
    cancel:()=>void,
    regUser?:ValidationStatus,
}

export default function Registration({registrate, cancel, regUser}: Props): ReactElement {
    const email = useRef<HTMLInputElement>(null);
    let newUser:User = {id:"", name:"", email:"",password:""};

    useEffect(() => {
        email.current?.focus();
    }, [])

    return (
        <div className={style.back}>
            <div className={style.box}>
                <h2>Sign up</h2>
                {regUser===ValidationStatus.NOTVALID && <div className={style.warning}>Try Again</div>}
                <form className={style.form}>
                    <input type="email" ref={email} placeholder='Enter email' onChange={(e)=>{newUser.email=e.target.value}} />
                    <input type="text" placeholder='Enter name' onChange={(e)=>{newUser.name=e.target.value}} />
                    <input type="password" placeholder='Enter password' onChange={(e)=>{newUser.password=e.target.value}} />
                    <div className={style.buttons}>
                        <Link to='/login' onClick={()=>registrate(newUser)}><button className='btn btn-accept'>Sign up</button></Link>
                        <Link to='/' onClick={()=>cancel()}><button className='btn btn-reject'>Cancel</button></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
