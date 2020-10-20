export interface User{
    id:string,
    name:string,
    email:string,
    password:string,
    chats?:Chat[],
}

export interface Chat{
    with?:User,
    messages:Message[],
}

interface Message{
    body:string,
}