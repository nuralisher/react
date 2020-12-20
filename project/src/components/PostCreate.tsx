import React, { ReactElement, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Post } from '../local/interfaces'
import style from './css/modal-form.module.css'

interface Props {
    create:(post:Post)=>void,
    cancelUrl:string,
}

export default function PostCreate({create, cancelUrl, }: Props): ReactElement {
    let newPost:Post = {body:""};
    const textarea = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        textarea.current?.focus();
    }, [])

    return (
        <div className={style.back}>
            <div className={style.box} >
                <h2>Create New Post</h2>
                <div className={style.form} >
                    <textarea ref={textarea} placeholder='Write post' onChange={(e)=>newPost.body=e.target.value } />
                    <div className={style.buttons} >
                        <Link to={cancelUrl} onClick={()=>create(newPost)} ><button className={`${style.btn} ${style.btn_accept}`}>Create</button></Link>
                        <Link to={cancelUrl}><button className={`${style.btn} ${style.btn_reject}`} >Cancel</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
