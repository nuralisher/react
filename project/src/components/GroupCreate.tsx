import React, { ReactElement, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Group, User } from '../local/interfaces'
import style from './css/modal-form.module.css'

interface Props {
    create:(group:Group)=>void,
    createdId:string,
    cancel:()=>void,
}

export default function GroupCreate({create, createdId, cancel, }: Props): ReactElement {
    const authUser:User = useSelector((state:any) => state.authReducer.user);
    let newGroup:Group = {
        id:"",
        name:"",
        admin: {...authUser},
        users:[], 
        posts:[]
    };
    const nameInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        nameInput.current?.focus();
    }, [])

    return (
        <div className={style.back}>
            <div className={style.box} >
                <h2>Create New Group</h2>
                {!createdId && <div className={style.warning}>Type something</div> }
                <div className={style.form} >
                    <input ref={nameInput} type="text" placeholder='Name of Group' onChange={(e)=>newGroup.name=e.target.value} />
                    <div className={style.buttons} >
                        <Link to='/my-groups' onClick={()=>create(newGroup)} ><button className={`${style.btn} ${style.btn_accept}`} >Create</button></Link>
                        <Link to='/my-groups' onClick={()=>cancel()} ><button className={`${style.btn} ${style.btn_reject}`} >Cancel</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
