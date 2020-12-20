import { ActionType } from "../local/actionType";
import { Group, Post } from "../local/interfaces";
const initialState = {
    groups: [],
    selectedGroup: { group: {id:"", posts:[], users:[],}, followed: false, },
    subscribedGroups: [],
    myGroups: [],
}

const groupReducer = (state:any = initialState,  action: {type : ActionType, groups:Group[], group:Group,post:Post,  followed:boolean})=>{
    switch(action.type){
        case ActionType.SETGROUPS:
            return {...state, groups: [...action.groups]}
        case ActionType.SELECTGROUP:
            return {...state, selectedGroup:{...state.selectedGroup, 
                group: {...action.group, posts: [...action.group.posts]}}}
        case ActionType.TOGGLEFOLLOWEDGROUP:
            return {...state, selectedGroup:{...state.selectedGroup, followed: action.followed}}
        case ActionType.ADDPOST:
            return {...state, selectedGroup: {...state.selectedGroup, 
                group: {...state.selectedGroup.group, 
                    posts: [...state.selectedGroup.group.posts, action.post]
                }}}
        case ActionType.SETSUBSCRIBEDGROUPS:
            return {...state, subscribedGroups: [...action.groups]};
        case ActionType.SETMYGROUPS:
            return {...state, myGroups: [...action.groups]};
        case ActionType.LOGOUT:
            return {...initialState}
        default:
            return state;
    }
}

export default groupReducer;