import React, { ReactElement } from 'react'
import { Link, NavLink } from 'react-router-dom'

interface Props {
    logout:()=>void,
}

export default function Sidebar({logout, }: Props): ReactElement {
    return (
        <div>
            <NavLink to='/profile'>Profile</NavLink>
            <NavLink to='/chats'>Chats</NavLink>
            <NavLink to='/groups'>Groups</NavLink>
            <NavLink to='/users'>Users</NavLink>
            <NavLink to='/groups/subscribed'>subscribed groups</NavLink>
            <NavLink to='/' onClick={()=>logout()}>Log out</NavLink>
        </div>
    )
}
