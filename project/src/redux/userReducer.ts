import { ActionType } from "../local/actionType";
import { User } from "../local/interfaces";

const initialState = {
    users:[
    ],
}

const userReducer = (state:any = initialState,  action: {type : ActionType, users:User[]})=>{
    switch(action.type){
        case ActionType.SETUSERS:
            return {...state, users: [...action.users]}
        case ActionType.LOGOUT:
            return {...initialState}
        default:
            return state;
    }
}

export default userReducer;