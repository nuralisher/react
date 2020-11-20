import React, { ReactElement } from 'react'
import { Link, NavLink } from 'react-router-dom'

interface Props {
    backToHome:()=>void,
}

export default function Fail({backToHome,}: Props): ReactElement {
    return (
        <div>
            <Link to='/' onClick={backToHome} >Back to home</Link>
        </div>
    )
}
