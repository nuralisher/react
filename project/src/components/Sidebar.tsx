import React, { ReactElement } from 'react'
import { Link, NavLink } from 'react-router-dom'
import sidebar from './css/sidebar.module.css';
import profileLogo from './../images/user.svg';
import groupLogo from './../images/group.svg';
import chatLogo from './../images/chat.svg';
import logoutLogo from './../images/logout.svg';


interface Props {
    logout:()=>void,
}

export default function Sidebar({logout, }: Props): ReactElement {
    return (
        <div className={sidebar.sidebar} >
            <div className={sidebar.sidebar_inner} >
                <NavLink activeClassName={sidebar.active_link} className={sidebar.link} to='/profile'>
                    <div> <img src={profileLogo} className={sidebar.icon} /> </div>
                    <div>Profile</div>
                </NavLink>
                <NavLink activeClassName={sidebar.active_link} className={sidebar.link} to='/chats'>
                    <div> <img src={chatLogo} className={sidebar.icon} /> </div>
                    <div>Chats</div>
                </NavLink>
                <NavLink activeClassName={sidebar.active_link} className={sidebar.link} to='/my-groups'>
                    <div> <img src={groupLogo} className={sidebar.icon} /> </div>
                    <div>My Groups</div>
                </NavLink>
                <NavLink activeClassName={sidebar.active_link} className={sidebar.link} to='/groups'>
                    <div> <img src={groupLogo} className={sidebar.icon} /> </div>
                    <div>Groups</div>
                </NavLink>
                <NavLink activeClassName={sidebar.active_link} className={sidebar.link} to='/users'>
                    <div> <img src={groupLogo} className={sidebar.icon} /> </div>
                    <div>Users</div>
                </NavLink>
                <NavLink className={sidebar.link} to='/' onClick={()=>logout()}>
                    <div> <img src={logoutLogo} className={sidebar.icon} /> </div>
                    <div> Log out </div>
                </NavLink>
            </div>     
        </div>
    )
}
