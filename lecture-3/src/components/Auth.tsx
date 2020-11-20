import React, { ReactElement, useEffect, useRef } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { User } from '../interfaces/User';

interface Props {
    auth:(user:User)=>void,
    cancel:()=>void,
    isFailed:boolean,
}

export default function Auth({auth, cancel, isFailed}: Props): ReactElement {
    let user:User = {id:"", name:"", email:"",password:""};
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        ref.current?.focus();
    }, [])
    
    return (
        <div>
            {isFailed && <Redirect to='/fail' /> }
            <input ref={ref} type="email" placeholder='email' onChange={(e)=>{user.email = e.target.value}} />
            <input type="password" placeholder='password' onChange={(e)=>{user.password = e.target.value}} />
                <div className="btns">
                    <Link to='/welcome' onClick={()=>auth(user)} >Log in</Link>
                    <Link to='' onClick={cancel} >Cancel</Link>
                </div>
        </div>
    )
}
