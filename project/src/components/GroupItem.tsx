import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { Link, Route, useRouteMatch } from 'react-router-dom'
import { CurrentUser } from '../App';
import { Group, Post } from '../local/interfaces';
import { groups } from '../local/localdb';
import PostCreate from './PostCreate';
import style from './css/group.module.css'
import groupImg from '../images/group.svg';

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
        <div className={style.main} >
            <div className={style.left}>
                <div className={style.left_inner}>
                    <div><img src={groupImg} className={style.img} /></div>
                    <div className={style.name}>
                        {currentGroup.name}
                    </div>
                    <div className={style.info_box}>
                        <div className={style.info} >ID: <span className={style.info_value}>{currentGroup.id}</span> </div>
                        <div className={style.info} >Admin: <span className={style.info_value}>{currentGroup.admin.name}</span> </div>
                        <div className={style.info} >Group Users  <span className={style.info_value}>{currentGroup.users.length}</span> </div>
                    </div>
                </div>
            </div>

            <div className={style.right}>
                <div className={style.posts_header}>
                    <div className={style.posts_nuber}>
                        Number of posts:{currentGroup.posts.length}
                    </div>
                    {currentGroup.admin===user ?
                    <Link className={style.create_btn} to={`${match.url}/createPost`} >Create Post </Link>
                    :
                    <>
                        {subscribed?
                        <button className={style.unsubscribe} onClick={()=>toggleSubscribe()} >Unsubscribe</button>
                        :
                        <button className={style.subscribe} onClick={()=>toggleSubscribe()} >Subscribe</button>}
                    </>
                    }
                </div>
                {currentGroup.posts.length>0 ?
                <div className={style.posts}>
                        {currentGroup.posts.map((post)=>(
                            <div>
                                {post.body.map((line)=>( 
                                <div className={style.post_item}> 
                                    {line} <br/> 
                                </div> 
                                ) ) }
                            </div>
                        ) ) }
                </div>
                :
                <div className={style.box} >
                    <div  >No posts </div>
                </div>
                }
            </div>

            
            
            
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
    }

    function addPost(post:Post){
        if(post.body.length>0){
            post.body.forEach((line)=>{line = line.trim()});
            post.body = post.body.filter((line )=>line!=='');
        
            if(post.body.length===0){
                return;
            }

            currentGroup.posts.push(post);
        }
    }
}
