import React, { ReactElement, useEffect } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Group } from '../local/interfaces'
import withObjectList from './withObjectList'
import style from './css/groups.module.css'
import groupImg from '../images/group.svg'
import { useDispatch, useSelector } from 'react-redux'
import { ActionType } from '../local/actionType'
import { getGroups } from '../api/api'

interface Props {
}

function Groups({}: Props): ReactElement {
    let match = useRouteMatch();
    const groupList:Group[] = useSelector((state:any) => state.groupReducer.groups);
    const dispatch = useDispatch();

    
    async function fetchGroups(){
        const groups:Group[] = await getGroups();
        dispatch({type:ActionType.SETGROUPS, groups})
    };

    useEffect(() => {
        fetchGroups();
    }, [])

    return (
        <div className={style.main} >
            <div className={style.header}>
                <div>Groups</div>
            </div>
            {groupList.length>0?
                <div className={style.box} >
                    {groupList.map((group)=>(
                        <Link className={style.group_item} to={`${match.url}/${group.id}`} >
                            <div><img className={style.group_image} src={groupImg}/></div>
                            <div className={style.name}>{group.name}</div>
                            <div className={style.users}>{group.admin.email} </div>
                        </Link>
                    ))}
                </div>
            :
            <div className={style.box}>
                <div className={style.no_group}>No groups</div>
            </div>
            }

            
            
        </div>
    )

}

// export default withObjectList({lists:groups,})(Groups);
export default Groups;