import React, { ReactElement, useCallback, useContext, useEffect, useRef, useState,} from 'react'
import { Redirect,  } from 'react-router-dom'
import style from './css/profile.module.css';
import userImg from '../images/user.svg'
import editImg from '../images/group.svg'
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../local/localdb';
import { ActionType } from '../local/actionType';
import { ValidationStatus } from '../local/validationStatus';
import ProfileImage from './ProfileImage';

interface Props {
    authUser: ValidationStatus,
}

export default function Profile({authUser,}: Props): ReactElement {
    const curUser = useSelector((state:any)=> state.authReducer.user);
    const [isChanging, setIsChanging] = useState(false);
    const [valid, setValid] = useState(true);
    const [isTrue, setIsTrue] = useState(true);
    const passInput = useRef<HTMLInputElement>(null);
    const newPassInput = useRef<HTMLInputElement>(null);
    let oldPass = "";
    let newPass = "";
    const dispatch = useDispatch();
    const [image, setImage] = useState(false);

    const getImage = useCallback(()=>{
        if(image){return userImg}
        else {return editImg}
    }, [image]);

    useEffect(() => {
        passInput.current?.focus();
        if(!valid){
            newPassInput.current?.focus();
        }
    }, )

    return (
        <div className={style.main}>
        <div className={style.header}>
            <div>Profile</div>
        </div>
            {authUser === ValidationStatus.NOTVALID?
            
            <>
                <Redirect to='/login'/>
            </>
            :
            <div className={style.box}>
                <div className={style.box_inner} >
                    <div className={style.info} >ID: <span className={style.info_value}>{curUser.id}</span></div>
                    <div className={style.info} >Name: <span className={style.info_value}>{curUser.name}</span></div>
                    <div className={style.info}>Email: <span className={style.info_value}>{curUser.email}</span></div>
                    {/* <div className={style.info} >
                        Number of subscribed groups: <span className={style.info_value}>{curUser.groups?.length}</span>
                    </div> */}
                    <div>
                        {!isChanging && <button className={style.change} onClick={()=>displayChange()}> Change Password </button>}
                        {isChanging && 
                        <div className={style.form} > 
                            <input ref={passInput} placeholder="current password" type="password" 
                                onChange={(e)=>{oldPass=e.target.value}}  className={style.input_pass} />

                            {!isTrue && <div className={style.warning} >Incorrect password</div> }

                            <input ref={newPassInput} placeholder="new password" type="password" 
                                onChange={(e)=>{newPass=e.target.value}} className={style.input_pass} />
                                
                            {!valid && <div className={style.warning} >New password is invalid</div> }

                            <div className={style.btns} >
                                <button className={style.save} onClick={()=>changePassword()} >Save</button>
                                <button className={style.cancel} onClick={()=>cancel()} >Cancel</button>
                            </div>
                        </div>
                        }
                    </div>
                </div>
                <div> 
                    <ProfileImage getImage={getImage} />
                    <div><button onClick={()=>setImage((p)=>!p)} >Change image</button></div>
                </div>
            </div>
            }
        </div>
    )

    function displayChange(){
        setIsChanging((prev)=>(prev=true));
    }

    function cancel(){
        setIsChanging((prev)=>(prev=false));
        setIsTrue((p)=>(p=true));
        setValid((p)=>(p=true));
    }

    function changePassword(){

        if(oldPass!==curUser.password){
            setIsTrue((p)=>(p=false));
            setValid((p)=>(p=true));
            return
        }

        if(newPass.length<=8){
            setValid((p)=>(p=false));
            setIsTrue((p)=>(p=true));
            return
        }

        // curUser.password = newPass;
        auth.me.password = newPass;
        dispatch({type:ActionType.CHANGEPASSWORD, password: newPass});

        cancel();
    }
}
