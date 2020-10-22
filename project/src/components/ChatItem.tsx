import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import { CurrentUser } from '../App';
import { Chat, User } from '../local/interfaces'
import style from './css/chatItem.module.css'

interface Props {
    chat:Chat,
    send:(receiverEmail:string, message:string)=>void,
}

export default function ChatItem({chat, send}: Props): ReactElement {
    // let receiverEmail:string ="";
    // let message:string = "";
    const curUser = useContext(CurrentUser);
    const [receiverEmail, setReceiverEmail] = useState("");
    const [message, setMessage] = useState("");
    const text = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);

    useEffect(() => {
        changeMessage("");
        changeReceiver("");
        console.log('render');
        if(!chat.with?.id){
            email.current?.focus();
        }else{
            text.current?.focus();
        }
    },[chat])

    return (
        <div className={style.chatItem} >
            {!chat.with?.id?
            <div className={style.newChat} >
                <div className={style.header} >
                    <h3>Whom: </h3>
                    <div className={style.input_email_box}>
                        <input className={style.input_email}  value={receiverEmail} 
                            ref={email} type="email" placeholder='Email of receiver' 
                            onChange={(e)=>changeReceiver(e.target.value)} />
                    </div>
                </div>
                <div className={style.form} >
                    <input  className={style.input_message}  value={message} 
                        type="text" placeholder='Type message' 
                        onChange={(e)=>changeMessage(e.target.value)} />

                    <button className={style.send} onClick={()=>sendIt(receiverEmail, message)} >Send</button>
                </div>
            </div>
            :
            <div className={style.chat} >
                <div className={style.header2} >
                    <div>{chat.with.name}</div>
                </div>
                <div  className={style.message_box} >
                    {chat.messages.map((message)=>(
                        <div  className={message.from===curUser? style.from_me: style.to_me }  >
                            <div className={style.message_header} >
                                <div className={style.from} >{message.from.name}</div>
                                <div className={style.date} > {message.date.toString().substring(4,24)} </div>
                            </div>
                            <div className={style.body} >{message.body}</div>
                        </div>
                    ))}
                </div>
                <div className={style.form} >
                    <input className={style.input_message} value={message} ref={text} type="text" placeholder='Type message' onChange={(e)=>changeMessage(e.target.value)} />
                    <button className={style.send}  onClick={()=>sendIt(chat.with?.email||"", message)} >Send</button>
                </div>
             </div>
            }
        </div>
    )

    function sendIt(receiverEmail:string, message:string){
        send(receiverEmail, message);
        changeMessage("");
        changeReceiver("");
        text.current?.focus();
    }

    function changeReceiver(email:string){
        setReceiverEmail((prev)=>(prev=email));
    }

    function changeMessage(message:string){
        setMessage((prev)=>(prev=message));
    }
}
