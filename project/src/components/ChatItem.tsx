import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Chat, User } from '../local/interfaces'

interface Props {
    chat:Chat,
    send:(receiverEmail:string, message:string)=>void,
}

export default function ChatItem({chat, send}: Props): ReactElement {
    // let receiverEmail:string ="";
    // let message:string = "";
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
        <div>
            {!chat.with?.id?
            <div>
                <h3>New Chat</h3>
                <input value={receiverEmail} ref={email} type="email" placeholder='Email of receiver' onChange={(e)=>changeReceiver(e.target.value)} />
                <input value={message} type="text" placeholder='Type message' onChange={(e)=>changeMessage(e.target.value)} />
                <button onClick={()=>sendIt(receiverEmail, message)} >Send</button>
            </div>
            :
            <div> 
                <h3>Chat with {chat.with.name}</h3>
                <div>
                    {chat.messages.map((message)=>(
                        <div>
                            <div>From: {message.from.name}</div>
                            <div>{message.body} {message.date.toDateString()} </div>
                        </div>
                    ))}
                </div>
                <input value={message} ref={text} type="text" placeholder='Type message' onChange={(e)=>changeMessage(e.target.value)} />
                <button onClick={()=>sendIt(chat.with?.email||"", message)} >Send</button>
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
