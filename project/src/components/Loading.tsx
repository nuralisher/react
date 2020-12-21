import React, { ReactElement } from 'react'
import style from './css/modal-form.module.css'

interface Props {
    
}

export default function Loading({}: Props): ReactElement {
    return (
        <div className={style.back_white}>
            <div className={style.center} >Loading...</div>
        </div>
    )
}
