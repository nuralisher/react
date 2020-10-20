import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    
}

export default function example({}: Props): ReactElement {
    return (
        <div>
            <Link to='/'>return</Link>
        </div>
    )
}
