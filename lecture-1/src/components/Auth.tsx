import React, { ReactElement } from 'react'

interface Props {
    auth:(email:string, password:string)=>void,
    cancel:()=>void,
}

export default function Auth({auth, cancel}: Props): ReactElement {
    let email:string = '', password:string = '';

    return (
        <div>
            <input type="text" placeholder='Type Email' onChange={(event)=>{email = event.target.value}} />
            <input type="password" placeholder='Type Password' onChange={(event)=>{password = event.target.value}}/>

            <div className="btns">
                <button onClick={()=>{auth(email, password)}}>Submit</button>
                <button onClick={ ()=>{cancel()} }>Cancel</button>
            </div>
        </div>
    )
}
