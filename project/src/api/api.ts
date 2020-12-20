import Axios from "axios";
import { Group, groupPost, groupUser, User } from "../local/interfaces";

const instance = Axios.create({
    baseURL: "http://localhost:3000/",
})

export const getGroups = ()=>{
    return instance.get("groups").then(response=> response.data);
}

export const getGroupById = (id:string)=>{
    return instance.get(`groups/${id}`).then(response=>response.data);
}

export const addGroup = (group: Group)=>{
    return instance.post("groups", group);
}

export const createPost = ( groupsPost : groupPost)=>{
    return instance.post(`groupPosts`, groupsPost);
}

export const followGroup = (groupUser: groupUser)=>{
     return instance.post('groupUsers', groupUser);
}

export const unfollowGroup = async (groupUser: groupUser)=>{
    const getGroupUser:groupUser[] =  await instance
    .get(`groupUsers?groupId=${groupUser.groupId}&userId=${groupUser.userId}`)
    .then(response=>response.data);
    return instance.delete(`groupUsers/${getGroupUser[0].id}`);
}

export const getGroupUsers = (groupId:string)=>{
    return instance.get(`groupUsers?groupId=${groupId}`).then(response=>response.data);
}

export const getGroupPosts = (groupId:string)=>{
    return instance.get(`groupPosts?groupId=${groupId}`).then(response=>response.data);
}
