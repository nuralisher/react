import {User} from './interfaces'

let user = {
    id:'3',
    name:'user',
    email:'a@mail.com',
    password:'password',
    chats:[],
}

export let users:User[] = [
    {
        id:'1',
        name:'Alisher',
        email:'alisher@mail.com',
        password:'password',
        chats:[
            {with:user, messages:[{body:"salem"}]}
        ],
    },
    {
        id:'2',
        name:'user',
        email:'u@mail.com',
        password:'password',
        chats:[],
    }
]
