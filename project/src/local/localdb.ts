import {Group, User} from './interfaces'

export let auth:{me:User} = {
    me: {id:"", name:"", email:"", password:""},
};

export let users:User[] = [
    {
        id:'1',
        name:'Alisher',
        email:'alisher@mail.com',
        password:'password',
        chats:[],
        groups:[],
    },
    {
        id:'2',
        name:'user',
        email:'u@mail.com',
        password:'password',
        chats:[],
        groups:[],
    }
]