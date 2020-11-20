import React, { ReactElement } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { User } from '../interfaces/User'

interface Props {
    curUser:User,
    logOut:()=>void,
}

export default function Welcome({curUser, logOut}: Props): ReactElement {
    return (
        <div>
            {curUser.id ? 
            <div>
                <div>Welcome {curUser.name}</div>
                <div><Link to='' onClick={logOut}>Log out</Link></div>
            </div>
            :<Redirect to='/fail' /> }
        </div>
    )
}
