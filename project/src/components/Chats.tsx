import React, { ReactElement, useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Chat, User } from '../local/interfaces'
import { users } from '../local/localdb'
import ChatItem from './ChatItem'
import MessageItem from './MessageItem'
import Messages from './Messages'


interface Props {
    user:User,
}

export default function Chats({user,}: Props): ReactElement {
    const defaultUser = {id:"", name:"", email:"",password:""};
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<User>(defaultUser);
    let match = useRouteMatch();
    const a = chats.map((chat)=>(
        <div> {chat.with} </div>
    ));

    useEffect(() => {
        let check = user.chats? user.chats : [];
        setChats((prev)=>(prev=check));
        user.chats = check;
        console.log('user chat:'+user.chats.length);
    }, [])

    return (
        <div>
            <button onClick={()=>openNewChat()} >New Chat</button>

            {chats.length>0? 
            chats.length
            :
            <div>Nochat</div>
            }
            <ChatItem chat={selectedChat} send={sendMessage}/>
        </div>
    )

    function openNewChat(){
        setSelectedChat((prev)=>(prev=defaultUser))
    }

    function selectChat(chat:Chat){
        setSelectedChat((prev)=>(prev=chat.with || defaultUser));
    }

    function sendMessage(emailReceiver:string, message:string){
        let receiver = users.find((u)=>u.email===emailReceiver);
        let createMessage = { body:message};
        let receiverChat = receiver?.chats?.find((chat)=>chat.with===user);
        
        if(!receiverChat){
            receiver?.chats?.push({with:user, messages:[]});
            receiverChat = receiver?.chats?.find((chat)=>chat.with===user);
        }

        receiverChat?.messages.push({ body:message});
        console.log(`sended: ${receiver?.name} , ${message}, ${receiverChat}`)

        setSelectedChat((prev)=>(prev=receiver || defaultUser));
        console.log(`sended22: ${receiverChat?.messages.length}, ${receiverChat?.with?.name}`)
    }
}
