import React, { ReactElement, useEffect, useState, } from 'react'
import { Link, Route, useRouteMatch } from 'react-router-dom'
import { Group, groupPost, groupUser, Post, User } from '../local/interfaces';
import { auth, users } from '../local/localdb';
import PostCreate from './PostCreate';
import style from './css/group.module.css'
import groupImg from '../images/group.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../local/actionType';
import { followGroup, getGroupById, createPost, unfollowGroup, getGroupUsers, getGroupPosts } from '../api/api';

interface Props {
    
}

export default function GroupItem({}: Props): ReactElement {
    let match = useRouteMatch<{id: string}>();
    const currentGroup:Group = useSelector((state:any)=>state.groupReducer.selectedGroup.group);
    const subscribed = useSelector((state:any)=> state.groupReducer.selectedGroup.followed);
    const authUser:User = useSelector((state:any)=>state.authReducer.user );
    const dispatch = useDispatch();
    const [disable, setDisable] = useState(false);
    
    useEffect(() => {
        async function getDatas(){
            const matchGroup:Group = await getGroupById(match.params.id);
            dispatch({type: ActionType.SELECTGROUP, group: matchGroup });
            
            const groupUsers:groupUser[] = await getGroupUsers(matchGroup.id);
            const findUser = groupUsers.find((u)=>u.userId===authUser.id);
            findUser?dispatch({type:ActionType.TOGGLEFOLLOWEDGROUP, followed:true})
            : dispatch({type:ActionType.TOGGLEFOLLOWEDGROUP, followed:false});
            groupUsers.forEach((groupUser)=>{
                matchGroup.users.push(users[parseInt(groupUser.userId)-1]);
            });

            const groupPosts:groupPost[] = await getGroupPosts(matchGroup.id);
            groupPosts.forEach((groupPost)=>{
                matchGroup.posts.push(groupPost.post);
            });
            dispatch({type: ActionType.SELECTGROUP, group: matchGroup });
        }

        getDatas();
    }, [] )

    if(currentGroup.id){}
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
                        <div className={style.info} >Admin: <span className={style.info_value}>{currentGroup.admin?.name}</span> </div>
                        <div className={style.info} >Group Users  <span className={style.info_value}>{currentGroup.users?.length}</span> </div>
                    </div>
                </div>
            </div>

            <div className={style.right}>
                <div className={style.posts_header}>
                    <div className={style.posts_nuber}>
                        Number of posts:{currentGroup.posts?.length}
                    </div>
                    {currentGroup.admin?.id===authUser.id ?
                    <Link className={style.create_btn} to={`${match.url}/createPost`} >Create Post </Link>
                    :
                    <>
                        {subscribed?
                        <button disabled={disable} className={`${style.unsubscribe} ${disable && style.disable}`} onClick={()=>toggleSubscribe()} >Unsubscribe</button>
                        :
                        <button disabled={disable} className={`${style.subscribe} ${disable && style.disable}`} onClick={()=>toggleSubscribe()} >Subscribe</button>}
                    </>
                    }
                </div>
                {currentGroup.posts?.length>0 ?
                <div className={style.posts}>
                        {currentGroup.posts.map((post)=>(
                            <div className={style.post_item} >
                                <pre>
                                    {post.body}
                                </pre>
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

    async function toggleSubscribe(){
        const groupUser:groupUser = {id:"", groupId:currentGroup.id, userId: authUser.id};
        setDisable((p)=>p=true);
        if(subscribed){
            await unfollowGroup(groupUser);
            auth.me.groups = auth.me.groups?.filter((group)=>group.id!=currentGroup.id);
        }else{
            await followGroup(groupUser);
            auth.me.groups?.push(currentGroup);
        }
        setDisable((p)=>p=false);
        dispatch({type:ActionType.TOGGLEFOLLOWEDGROUP, followed: !subscribed});
    }

    async function addPost(post:Post){
        post.body.trim();
        if(post.body.length>0){
            const groupPost: groupPost = {id:"", groupId:currentGroup.id, post };
            await createPost(groupPost);
            dispatch({type:ActionType.ADDPOST, post});
        }
    }
}
