import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { CurrentUser } from '../App'
import { Chat } from '../local/interfaces'
import { users } from '../local/localdb'
import ChatItem from './ChatItem'


interface Props {

}

export default function Chats({}: Props): ReactElement {
    const defaultUser = {id:"", name:"", email:"",password:""};
    const user = useContext(CurrentUser);
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat>({with:defaultUser, messages:[]});
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        console.log('RENDER CHATS')
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
        <div>
            <button onClick={()=>openNewChat()} >New Chat</button>

            {
            chats.length>0? 
            <>
            <h3>Chats</h3>
            <div>
                {chats.map((chat)=>(
                <div onClick={()=>selectChat(chat)} >
                    <div> {chat.with?.name}: </div>
                    <div className={chat.messages[chat.messages.length-1].readed?"readed": "new"}> 
                        <span>{chat.messages[chat.messages.length-1].from.name}:</span> {chat.messages[chat.messages.length-1].body} 
                    </div>
                </div>
                ))}
            </div>
            </>
            :
            <div>Nochat</div>
            }
            <ChatItem chat={selectedChat} send={sendMessage}/>
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
        console.log(`SEND TO ${emailReceiver}`);
        let receiver = users.find((u)=>u.email===emailReceiver);
        if(!receiver){
            console.log('no such user');
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
        console.log('DATE: '+currentDate);

        if(receiver!=user){
            receiverChat?.messages.push({readed:false, from:user , body:message, date:currentDate});
            currentChat?.messages.push({readed:true, from:user, body:message, date:currentDate});
        }else{    
            receiverChat?.messages.push({readed:true, from:user, body:message, date:currentDate});
        }
        
        console.log('DATE'+currentDate);

        console.log(`sended: ${receiver?.name} , ${message}, ${receiverChat}`);


        setSelectedChat((prev)=>(prev=currentChat || {messages:[]} ));
        sort();
        setRefresh((p)=>(p=!p));

        console.log(`sended22: ${receiverChat?.messages.length}, ${receiverChat?.with?.name}`)
    }
}
