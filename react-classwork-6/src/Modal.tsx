import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import './modal.css';
import userImg from './images/user.svg';

interface Props {
    open:boolean,
    close:()=>void,
}

const user = {
    name:"Alisher", 
    surname:"Nurzhanuly",
    phoneNumber:"87766772636",

}

export default function Modal({open, close}: Props): ReactElement {
    return (
        ReactDOM.createPortal(
            open?
            <div className='overlay'>
                <div className="modal">
                    <div className="head">
                        <img className="img" src={userImg} alt="user image"/>
                        <div className="name"> {user.name} {user.surname} </div>
                        <div className="phoneNum"> {user.phoneNumber} </div>
                    </div>
                    <div className="navs">
                        <div className="navItem">Create group</div>
                        <div className="navItem">Create chanel</div>
                        <div className="navItem">Contacts</div>
                        <div className="navItem">Settings</div>
                        <div className="navItem">About us</div>
                        <button className="closeBtn" onClick={close}>Close</button>
                    </div>
                </div>
            </div>
            :
            <></>, document.getElementById('modal') as Element)
    )
}
