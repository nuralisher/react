import React, { ReactElement } from 'react'
import style from './css/groups.module.css'
import img from '../images/group.svg'

interface Props {
    name:string,
    description:string,
}

export default function Fragment({name, description}: Props): ReactElement {
    return (
        <React.Fragment>
            <div><img className={style.group_image} src={img}/></div>
            <div className={style.name}>{name}</div>
            <div className={style.users}>{description} </div>
        </React.Fragment>
    )
}
