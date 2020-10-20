import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    
}

export default function NavBar({}: Props): ReactElement {
    return (
        <div className="bar">
            <ul>
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/hoc">
                    <li>HOC</li>
                </Link>

                <Link to="/hook">
                    <li>Hook</li>
                </Link>
            </ul>
        </div>
    )
}
