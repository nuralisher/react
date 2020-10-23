import React, { ReactElement } from 'react'
import { Link, Redirect } from 'react-router-dom'
import style from './css/main.module.css'

interface Props {
    
}

export default function Main({}: Props): ReactElement {
    return (
        <div className={style.main}> 
            <div className={style.header} >
                <div> React Project </div>
                <div><a target='blank' href="https://github.com/nuralisher/react">GitHub</a></div>
            </div>

            <div className={style.content}>
                <div className={style.left}>
                    <div className={style.left_inner} >
                        <div className={style.box} >
                            <div>
                                <div>This is react project done by:</div>
                                <ul>
                                    <li>Nurzhanuly Alisher</li>
                                    <li>Davlatov Sabirzhan</li>
                                    <li>Kamal Aruzhan</li>
                                </ul>
                            </div>
                            <div className={style.about} >
                                <div> Lorem, ipsum dolor. </div>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                                    Sunt ipsam laboriosam voluptate laudantium? Nemo cupiditate illum est veritatis molestiae dolores. 
                                    Porro sed odit itaque quidem omnis voluptate asperiores quo pariatur.</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={style.right} >
                    <div className={style.form}>
                        <div>Log in if you already have account</div>
                        <Link className={style.link} to='/login'>Log in</Link>
                        <div>Sign up if no account yet</div>
                        <Link className={style.link} to='/registration'>Sign up</Link>
                    </div> 
                </div>
            </div>



        </div>
    )
}
