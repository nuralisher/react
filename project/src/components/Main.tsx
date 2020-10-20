import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    
}

export default function Main({}: Props): ReactElement {
    return (
        <div>
            Main page
            
            <div className="box">
                <Link to='/login'>Log in</Link>
                <Link to='/registration'>Sign up</Link>
            </div>
        </div>
    )
}
