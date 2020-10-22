import React, { ReactElement } from 'react'
import { Link, Redirect } from 'react-router-dom'

interface Props {
    
}

export default function Main({}: Props): ReactElement {
    return (
        <div> 
            Main page
            
            <div className="box">
                <Link className="link" to='/login'>Log in</Link>
                <Link className="link" to='/registration'>Sign up</Link>
            </div>
        </div>
    )
}
