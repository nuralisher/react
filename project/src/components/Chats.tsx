import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CurrentUser } from '../App'
import { ActionType } from '../local/actionType'
import { Chat, User } from '../local/interfaces'
import { auth, users } from '../local/localdb'
import ChatItem from './ChatItem'
import style from './css/chat.module.css'

interface Props {

}

export default function Chats({}: Props): ReactElement {
    // const [chats, setChats] = useState<Chat[]>([]);
    // const [selectedChat, setSelectedChat] = useState<Chat>({with:defaultUser, messages:[]});
    const rchats:Chat[] = useSelector((state:any)=>state.chatsReducer.chats);
    const dispatch = useDispatch();

    useEffect(() => {
        // let check = user.chats? user.chats : [];
        // setChats((prev)=>(prev=check));
        
        sort();
        dispatch({type:ActionType.SETCHATS, chats: auth.me?.chats});
        dispatch({type:ActionType.SELECTCHAT, chat: null});
    }, [])


    function sort(){
        auth.me?.chats?.sort((ch1, ch2)=>{
            const lastMess1 = ch1.messages[ch1.messages.length-1];
            const lastMess2 = ch2.messages[ch2.messages.length-1];
            return (lastMess2.date.getTime() - lastMess1.date.getTime());
        });
    }

    return (
        <div className={style.chat} >
            <div className={style.left} >
                <div className={style.header} >
                    <h3>Chats</h3>
                    <button onClick={()=>openNewChat()} >New Chat</button> 
                </div>            

                {
                rchats?.length>0? 
                <>
                <div className={style.chats} >
                    {rchats.map((chat)=>(
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
            <ChatItem send={sendMessage}/>
            </div>
        </div>
    )

    function openNewChat(){
        // setSelectedChat((prev)=>(prev={with: defaultUser, messages:[]}));
        dispatch({type:ActionType.SELECTCHAT, chat:null});
    }

    function selectChat(chat:Chat){
        // setSelectedChat((prev)=>(prev=chat));
        dispatch({type:ActionType.SELECTCHAT, chat});
        // const findChat = chats.find((ch)=>ch.with===chat.with);
        // findChat?.messages.forEach(ch=>ch.readed=true);
    }

    function sendMessage(emailReceiver:string, message:string){
        message = message.trim();
        let receiver = users.find((u)=>u.email===emailReceiver);
        if((!receiver) ||  (!message)){
            return
        }
        
        let currentChat = auth.me.chats?.find((ch)=>ch.with?.id===receiver?.id);

        if(!currentChat){
            auth.me.chats?.push({with:receiver, messages:[]});
            currentChat = auth.me.chats?.find((ch)=>ch.with===receiver);
            dispatch({type:ActionType.SELECTCHAT, chat: currentChat});
        }
        

        let receiverChat = receiver?.chats?.find((chat)=>chat.with?.id===auth.me.id);

        if(!receiverChat){
            receiver?.chats?.push({with:auth.me, messages:[]});
            receiverChat = receiver?.chats?.find((chat)=>chat.with?.id===auth.me.id);
        }

        
        

        let currentDate = new Date();

        if(receiver.id!=auth.me.id){
            receiverChat?.messages.push({readed:false, from:auth.me , body:message, date:currentDate});
        }

        currentChat?.messages.push({readed:true, from:auth.me, body:message, date:currentDate});

        // setSelectedChat((prev)=>(prev=currentChat || prev ));
        sort();
    
        dispatch({type:ActionType.SETCHATS, chats: auth.me.chats});
        // sort();
        // setRefresh((p)=>(p=!p));
    }
}
