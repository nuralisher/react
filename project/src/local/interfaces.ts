export interface User{
    id:string,
    name:string,
    email:string,
    password:string,
    chats?:Chat[],
    groups?:Group[],
}

export interface Chat{
    with?:User,
    messages:Message[],
}

interface Message{
    from:User,
    readed:boolean,
    body:string,
    date:Date,
}

export interface Group{
    admin:User,
    id:string,
    name:string,
    posts:Post[],
    users:User[],
}

export interface Post{
    body:string[],
}