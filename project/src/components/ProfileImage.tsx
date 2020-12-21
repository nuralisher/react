import React, { ReactElement } from 'react'
import userImg from '../images/user.svg'
import style from './css/profile.module.css';

interface Props {
    getImage:()=> string,
}

export default function ProfileImage({getImage,}: Props): ReactElement {
    return (
        <>
            <img className={style.img} src={getImage()}/>
        </>
    )
}
