import React, { Profiler, ReactElement, useEffect, useState,  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionType } from '../local/actionType'
import { Chat, User } from '../local/interfaces'
import { auth, users, } from '../local/localdb'
import ChatItem from './ChatItem'
import style from './css/chat.module.css'
import ErrorBoundary from './ErrorBoundary'

interface Props {

}

export default function Chats({}: Props): ReactElement {
    const rchats:Chat[] = useSelector((state:any)=>state.chatsReducer.chats);
    const dispatch = useDispatch();

    useEffect(() => {
        sort();
        dispatch({type:ActionType.SETCHATS, chats: auth.me?.chats});
        dispatch({type:ActionType.SELECTCHAT, chat:  {with: null, messages:[]}});
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
                <ErrorBoundary>
                    <Profiler id="ChatItem" onRender={profileCallback} >
                        <ChatItem send={sendMessage}/>
                    </Profiler>
                </ErrorBoundary>
            </div>
        </div>
    )

    function profileCallback(
        id:string,
        phase:"mount"|"update",
        actualDuration:number,
        baseDuration: number,
        startTime: number ,
        commitTime: number,
    ){
        console.log("PROFILER INFOS: ID:" + id);
        console.log("phase:" + phase);
        console.log("actualDuration:" + actualDuration);
        console.log("baseDuration:" + baseDuration);
        console.log("startTime:" + startTime);
        console.log("commitTime:" + commitTime);
    }

    function openNewChat(){
        dispatch({type:ActionType.SELECTCHAT, chat: {with: null, messages:[]}});
    }

    function selectChat(chat:Chat){
        dispatch({type:ActionType.SELECTCHAT, chat});
    }

    function sendMessage(receiver:User, message:string){
        message = message.trim();
        if((!message)){
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

        sort();
    
        dispatch({type:ActionType.SETCHATS, chats: auth.me.chats});
    }
}
