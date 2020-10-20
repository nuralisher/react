import React, { ReactElement } from 'react'
import { User } from '../models/User'

interface Props {
    user:User,
}

export default function Welcome({user}: Props): ReactElement {
    return (
        <div>
            Welcome {user.name}, how are you doing?
        </div>
    )
}
