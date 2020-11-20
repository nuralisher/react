import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { CurrentUser } from '../App'
import { Chat } from '../local/interfaces'
import { users } from '../local/localdb'
import ChatItem from './ChatItem'
import style from './css/chat.module.css'

interface Props {

}

export default function Chats({}: Props): ReactElement {
    const defaultUser = {id:"", name:"", email:"",password:""};
    const user = useContext(CurrentUser);
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat>({with:defaultUser, messages:[]});
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        let check = user.chats? user.chats : [];
        setChats((prev)=>(prev=check));
    }, )

    function sort(){
        setChats((prev)=>(prev=
            prev.sort((ch1, ch2)=>{
                const lastMess1 = ch1.messages[ch1.messages.length-1];
                const lastMess2 = ch2.messages[ch2.messages.length-1];
                return (lastMess2.date.getTime() - lastMess1.date.getTime());
            })));
    }

    return (
        <div className={style.chat} >
            <div className={style.left} >
                <div className={style.header} >
                    <h3>Chats</h3>
                    <button onClick={()=>openNewChat()} >New Chat</button> 
                </div>            

                {
                chats.length>0? 
                <>
                <div className={style.chats} >
                    {chats.map((chat)=>(
                    <div className={style.chatItem} onClick={()=>selectChat(chat)} >
                        <div className={style.chatItem_inner} >                        
                            <div className={style.chatItem_with} > {chat.with?.name} </div>
                            <div className={chat.messages[chat.messages.length-1].readed?style.readed: style.new}> 
                                <span className={style.chatItem_from} >{chat.messages[chat.messages.length-1].from.name}:</span>
                                <span className={style.chatItem_body} > {chat.messages[chat.messages.length-1].body} </span>
                            </div>
                        </div>

                    </div>
                    ))}
                </div>
                </>
                :
                <div className={style.no_chat} > You don't have any chat  <br/> Create new chat to type </div>
                }
            </div>
            <div className={style.right} >
            <ChatItem chat={selectedChat} send={sendMessage}/>
            </div>
        </div>
    )

    function openNewChat(){
        setSelectedChat((prev)=>(prev={with: defaultUser, messages:[]}));
    }

    function selectChat(chat:Chat){
        setSelectedChat((prev)=>(prev=chat));
        const findChat = chats.find((ch)=>ch.with===chat.with);
        findChat?.messages.forEach(ch=>ch.readed=true);
    }

    function sendMessage(emailReceiver:string, message:string){
        message = message.trim();
        let receiver = users.find((u)=>u.email===emailReceiver);
        if((!receiver) ||  (!message)){
            return
        }
        let receiverChat = receiver?.chats?.find((chat)=>chat.with===user);
        
        if(!receiverChat){
            receiver?.chats?.push({with:user, messages:[]});
            receiverChat = receiver?.chats?.find((chat)=>chat.with===user);
        }

        
        let currentChat = user.chats?.find((ch)=>ch.with===receiver);

        if(!currentChat){
            user.chats?.push({with:receiver, messages:[]});
            currentChat = user.chats?.find((ch)=>ch.with===receiver);
        }
        
        let currentDate = new Date();

        if(receiver!=user){
            receiverChat?.messages.push({readed:false, from:user , body:message, date:currentDate});
            currentChat?.messages.push({readed:true, from:user, body:message, date:currentDate});
        }else{    
            receiverChat?.messages.push({readed:true, from:user, body:message, date:currentDate});
        }

        setSelectedChat((prev)=>(prev=currentChat || prev ));
        sort();
        setRefresh((p)=>(p=!p));
    }
}
