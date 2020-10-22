import userEvent from '@testing-library/user-event'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
import { CurrentUser } from '../App';
import { Group } from '../local/interfaces'
import { groups } from '../local/localdb';

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
        <div>
            <div>
                <h3>Subscribed Groups</h3>
                {subscribedGroups.length>0?
                    <div>
                        {subscribedGroups.map((group)=>(
                            <div><Link to={`/groups/${group.id}`} > {group.name} </Link></div>
                        ))}
                    </div>
                :
                <div>No Subscribed groups</div>
                }
            </div>
            <div>
                <h3>My Groups</h3>
                {myGroups.length>0?
                    <div>
                        {myGroups.map((group)=>(
                            <div><Link to={`/groups/${group.id}`} > {group.name} </Link></div>
                        ))}
                    </div>
                :
                <div>No groups created by you</div>
                }
            </div>
        </div>
    )
}
