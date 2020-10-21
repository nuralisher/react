import React, { ReactElement, useContext,} from 'react'
import { Redirect,  } from 'react-router-dom'
import {CurrentUser} from '../App';

interface Props {

}

export default function Profile({}: Props): ReactElement {
    const curUser = useContext(CurrentUser);

    return (
        <>
            {curUser.id?
            <div>logged {curUser.name}</div>
            :
            <div>
                <Redirect to='/login'/>
            </div>
            }
        </>
    )
}
