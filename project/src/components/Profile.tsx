import React, { ReactElement, useEffect, useRef , useState} from 'react'
import { BrowserRouter, Link, Redirect, useRouteMatch } from 'react-router-dom'
import { User } from '../local/interfaces';
import { users } from '../local/localdb';
import { ValidationStatus } from '../local/validationStatus'

interface Props {
    authUser?:ValidationStatus,
    user?:User,
}

export default function Profile({authUser, user}: Props): ReactElement {
    const [state, setstate] = useState(false);

    

    return (
        <div>
            {(authUser === ValidationStatus.VALID || user?.id) &&
            <div>logged {user?.name}</div>
            }

            {authUser === ValidationStatus.NOTVALID &&
            <div>
                <Redirect to='/login'/>
            </div>
            }
        </div>
    )
}
