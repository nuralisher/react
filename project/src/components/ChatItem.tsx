import React, { ReactElement, useCallback, useEffect, useMemo, useReducer, useRef, useState,  } from 'react'
import { useSelector } from 'react-redux';
import { Chat, User } from '../local/interfaces'
import { auth, users } from '../local/localdb';
import style from './css/chatItem.module.css'

interface Props {
    send:(receiverEmail:User, message:string)=>void,
}

function reducer(state: {receiverEmail:string, body:string}, action:{type:string, value:string}){
    switch(action.type){
        case "setReceiverEmail":
            return {...state, receiverEmail: action.value}
        case "setMessageBody":
            return {...state, body: action.value}
        default:
            return state;
    }
}

export default function ChatItem({ send}: Props): ReactElement {
    const chat:Chat = useSelector((state:any)=>state.chatsReducer.selectedChat);
    const [message, dispatch] = useReducer(reducer, {receiverEmail: "", body:""});
    const text = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const [error, setError] = useState(false);
    const [theme, setTheme] = useState(false);

    const themeStyle = useMemo(() => {
       if(theme){
           return style.dark;
       }else{
           return style.white;
       }
    }, [theme])

    useEffect(() => {
        changeMessage("");
        changeReceiver("");
        if(!chat.with){
            email.current?.focus();
        }else{
            text.current?.focus();
        }
        setError(false);
    },[chat])

    useEffect(() => {
        if(error){
            throw new Error("no such email");
        }
    }, [error])

    return (
        <div className={`${style.chatItem} ${themeStyle}`}  >
            {!chat.with?
            <div className={style.newChat}>
                <div className={style.header} >
                    <h3>Whom: </h3>
                    <div className={style.input_email_box}>
                        <input className={style.input_email}  value={message.receiverEmail} 
                            ref={email} type="email" placeholder='Email of receiver' 
                            onChange={(e)=>changeReceiver(e.target.value)} />
                    </div>
                    <div>
                        <button onClick={()=>setTheme((p)=>!p)} >Change Font size</button>
                    </div>
                </div>
                <div className={style.form} >
                    <input  className={style.input_message}  value={message.body} 
                        type="text" placeholder='Type message' 
                        onChange={(e)=>changeMessage(e.target.value)} />

                    <button type="submit" className={style.send} onClick={()=>sendIt(message.receiverEmail, message.body)} >Send</button>
                </div>
            </div>
            :
            <div className={style.chat} >
                <div className={style.header2} >
                    <div>{chat.with?.name}</div>
                    <div>
                        <button onClick={()=>setTheme((p)=>!p)} >Change Font size</button>
                    </div>
                </div>
                <div  className={style.message_box} >
                    {chat.messages?.map((message)=>(
                        <div  className={message.from.id===auth.me.id? style.from_me: style.to_me }  >
                            <div className={style.message_header} >
                                <div className={style.from} >{message.from.name}</div>
                                <div className={style.date} > {message.date.toString().substring(4,24)} </div>
                            </div>
                            <div className={style.body} ><pre>{message.body}</pre></div>
                        </div>
                    ))}
                </div>
                <div className={style.form} >
                    <input className={style.input_message} value={message.body} ref={text} type="text" placeholder='Type message' onChange={(e)=>changeMessage(e.target.value)} />
                    <button type="submit" className={style.send}  onClick={()=>sendIt(chat.with?.email||"", message.body)} >Send</button>
                </div>
             </div>
            }
        </div>
    )

    function sendIt(receiverEmail:string, message:string){
        const receiver = users.find((u)=>u.email===receiverEmail);
        if(!receiver){
            setError(true);
            return;
        }
        send(receiver, message);
        changeMessage("");
        changeReceiver("");
        text.current?.focus();
    }


    function changeReceiver(email:string){
        dispatch({type: "setReceiverEmail", value: email});
    }

    function changeMessage(message:string){
        dispatch({type: "setMessageBody", value:message });
    }
}
