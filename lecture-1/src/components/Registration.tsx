import React, { ReactElement } from 'react'
import {User} from '../models/User'

interface Props {
    registrate:(newUser:User)=>void,
    cancel:()=>void,
}

export default function Registration({registrate, cancel}: Props): ReactElement {
    let user:User = {id:0, name:"", email:"", password:""}


    return (
        <div>
            <input type="text" onChange={(event)=>{user.name = event.target.value }} placeholder="Type name"/>
            <input type="email" placeholder="Type email" onChange={(event)=> {user.email= event?.target.value}}/>
            <input type="password" placeholder="Type password" onChange={(event)=> {user.password = event?.target.value}}/>

            <div className="btns">
                <button onClick={()=>{registrate(user)}}>Submit</button>
                <button onClick={ ()=>{cancel()} }>Cancel</button>
            </div>
        </div>
    )
}
