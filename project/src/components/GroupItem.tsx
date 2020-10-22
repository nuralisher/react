import { group } from 'console';
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { Link, Route, useRouteMatch } from 'react-router-dom'
import { CurrentUser } from '../App';
import { Group, Post } from '../local/interfaces';
import { groups } from '../local/localdb';
import PostCreate from './PostCreate';

interface Props {
    
}

export default function GroupItem({}: Props): ReactElement {
    let match = useRouteMatch<{id: string}>();
    const [currentGroup, setCurrentGroup ] = useState<Group>({
        id:"", 
        name:"",
        admin: {id:"", name:"", email:"", password:""},
        posts:[],
        users:[]
    });
    const user = useContext(CurrentUser);
    const [subscribed, setSubscribed] = useState(false);
    
    useEffect(() => {
        const matchGroup = groups.find((group)=>group.id===match.params.id); 
        setCurrentGroup((prev)=>(prev=matchGroup|| prev));
        const findUser = matchGroup?.users.find((u)=>u.id===user.id);
        findUser?setSubscribed((prev)=>(prev=true)): setSubscribed((prev)=>(prev=false));
    }, [] )

    return (
        <div  >
            <div>
                {currentGroup.id}
            </div>
            <div>
                Admin: {currentGroup.admin.name}
            </div>
            <div>
                {currentGroup.name}
            </div>
            <div>
                Group Users {currentGroup.users.length}
            </div>
            <div>
                CurrentUser groups length: {user.groups?.length}
            </div>

            {currentGroup.admin===user ?
            <div>
                <Link to={`${match.url}/createPost`} > <button>Create Post</button> </Link>
            </div>
            :
            <div>
                {subscribed?
                <button onClick={()=>toggleSubscribe()} >Unsubscribe</button>
                :
                <button onClick={()=>toggleSubscribe()} >Subscribe</button>}
            </div>
            }

            {currentGroup.posts.length>0 ?
            <div>
                Posts: length {currentGroup.posts.length}, 
                <div>
                    {currentGroup.posts.map((post)=>(
                        <div>
                        <h3>Post: </h3>    
                        {post.body.map((line)=>( <> {line} <br/> </> ) ) }
                        </div>
                    ) ) }
                </div>
            </div>
            :
            <div>No posts </div>
            }

            
            
            
          <Route path='/groups/:id/createPost' component={()=><PostCreate create={addPost} cancelUrl={match.url} />} />
        </div>
    )

    function toggleSubscribe(){
        if(subscribed){
            user.groups = user.groups?.filter(group=>group!=currentGroup);
            const updGroupUsers = currentGroup.users.filter( u=>u!=user );
            const updGroup:Group = currentGroup;
            updGroup.users = updGroupUsers;
            setCurrentGroup((prev)=>(prev=updGroup));

        }else{
            user.groups?.push(currentGroup);
            currentGroup.users.push(user);
        }

        setSubscribed((prev)=>(prev=!prev));
        console.log('LENGTH:'+ user.groups?.length);
    }

    function addPost(post:Post){
        if(post.body.length>0){
            post.body.forEach((line)=>{line.trim()});
            post.body = post.body.filter((line )=>line!=='');
        
            if(post.body.length===0){
                return;
            }

            currentGroup.posts.push(post);
        }
    }
}
