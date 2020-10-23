import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
import { CurrentUser } from '../App';
import { Group } from '../local/interfaces'
import { groups } from '../local/localdb';
import style from './css/groups.module.css'
import groupImg from '../images/group.svg'

interface Props {
    
}

export default function SubscibedGroups({}: Props): ReactElement {
    const user = useContext(CurrentUser);
    const [subscribedGroups, setSubscribedGroups] = useState<Group[]>([]);
    const [myGroups, setMyGroups] = useState<Group[]>([]);

    useEffect(() => {
        setSubscribedGroups(user.groups || []);
        setMyGroups(groups.filter(group=>group.admin===user));
    }, [])

    return (
        <div  className={style.main} >
            <div>
            <div className={style.header}>
                <div>Subscribed Groups</div>
            </div>
                {subscribedGroups.length>0?
                    <div className={style.box} >
                        {subscribedGroups.map((group)=>(
                            <Link className={style.group_item}  to={`/groups/${group.id}`} > 
                                <div><img className={style.group_image} src={groupImg}/></div>
                                <div className={style.name}>{group.name}</div>
                                <div className={style.users}>{group.users.length} subscribers</div>
                            </Link>
                        ))}
                    </div>
                :
                <div className={style.box}>
                    <div className={style.no_group}>No Subscribed groups</div>
                </div>
                }
            </div>
            <div>
            <div className={style.header}>
                <div>My Groups</div>
                <Link className={style.create} to={`groups/createNew`}>Create new group</Link>
            </div>
                {myGroups.length>0?
                    <div  className={style.box} >
                        {myGroups.map((group)=>(
                            <Link className={style.group_item}  to={`/groups/${group.id}`} > 
                                <div><img className={style.group_image} src={groupImg}/></div>
                                <div className={style.name}>{group.name}</div>
                                <div className={style.users}>{group.users.length} subscribers</div>
                            </Link>
                        ))}
                    </div>
                :
                <div className={style.box}>
                    <div className={style.no_group}>No Subscribed groups</div>
                </div>
                }
            </div>
        </div>
    )
}
