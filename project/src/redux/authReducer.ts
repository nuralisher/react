import { ActionType } from "../local/actionType";
import { User } from "../local/interfaces";

const initialState = {
    isAuth: false,
    user:{id:"", name:"", email:"", password:""},
}

const authReducer = (state:any = initialState   , action: {type: ActionType, user:User, password:string })=>{
    switch (action.type){
        case ActionType.LOGUSER:
            return {...state, isAuth:true, user:{...action.user} }
        case ActionType.LOGOUT:
            return {...initialState}
        case ActionType.CHANGEPASSWORD:
            return {...state, user:{...state.user, password: action.password}}
        default:
            return state;
    }
}


export default authReducer;