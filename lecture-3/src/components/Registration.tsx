import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Link} from 'react-router-dom'
import { User } from '../interfaces/User';

interface Props {
    registrate:(user:User)=>void,
    cancel:()=>void,
}

export default function Registration({registrate, cancel, }: Props): ReactElement {
    let user:User = {id:"", name:"", email:"",password:""};
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        ref.current?.focus();
    }, [])

    return (
        <div>
            <input ref={ref} type="email" placeholder='email' onChange={(e)=>{user.email = e.target.value}} />
            <input type="text" placeholder='name' onChange={(e)=>{user.name = e.target.value}} />
            <input type="password" placeholder='password' onChange={(e)=>{user.password = e.target.value}} />
            <div className="btns">
                <Link to='/login' onClick={()=>registrate(user)} >Sign up</Link>
                <Link to='' onClick={cancel} >Cancel</Link>
            </div>
        </div>
    )
}

