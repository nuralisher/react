import { ActionType } from "../local/actionType"
import { Chat } from "../local/interfaces"

const initialState = {
    chats:[],
    selectedChat: {with: null, messages:[]},
}

const chatsReducer = (state = initialState, action: {type:ActionType, chats:Chat[], chat:Chat, })=>{
    switch (action.type){
        case ActionType.SETCHATS:
            return {...state, chats:[...action.chats],}
        case ActionType.SELECTCHAT:
            action.chat?.messages.forEach(ch=>ch.readed=true);
            return {...state, selectedChat:{...action.chat}};
        case ActionType.LOGOUT:
            return {...initialState}
        default:
            return state;
    }
}

export default chatsReducer;