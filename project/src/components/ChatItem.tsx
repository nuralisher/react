import React, { ReactElement } from 'react'
import { Chat, User } from '../local/interfaces'

interface Props {
    chat:User,
    send:(receiverEmail:string, message:string)=>void,
}

export default function ChatItem({chat, send}: Props): ReactElement {
    let receiverEmail:string ="";
    let message:string = "";

    return (
        <div>
            {!chat.id?
            <div>
                <h3>New Chat</h3>
                <input type="email" placeholder='Email of receiver' onChange={(e)=>{receiverEmail=e.target.value}} />
                <input type="text" placeholder='Type message' onChange={(e)=>{message=e.target.value}} />
                <button onClick={()=>send(receiverEmail, message)} >Send</button>
            </div>
            :
            <div> {chat.name} </div>
            }
        </div>
    )
}
