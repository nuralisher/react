import React, { ReactElement, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Group } from '../local/interfaces'
import style from './css/modal-form.module.css'

interface Props {
    create:(group:Group)=>void,
    createdId:string,
    cancel:()=>void,
}

export default function GroupCreate({create, createdId, cancel, }: Props): ReactElement {
    let newGroup:Group = {
        id:"",
        name:"",
        admin: { id:"", name:"", email:"", password:'' },
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
                <h2>Creat New Group</h2>
                {!createdId && <div className={style.warning}>Type something</div> }
                <div className={style.form} >
                    <input ref={nameInput} type="text" placeholder='Name of Group' onChange={(e)=>newGroup.name=e.target.value} />
                    <div className={style.buttons} >
                        <Link to='/groups' onClick={()=>create(newGroup)} ><button className='btn btn-accept'>Create</button></Link>
                        <Link to='/groups' onClick={()=>cancel()} ><button className='btn btn-reject'>Cancel</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
