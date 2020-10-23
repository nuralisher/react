import React, { ReactElement } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Group } from '../local/interfaces'
import { groups } from '../local/localdb'
import withObjectList from './withObjectList'
import style from './css/groups.module.css'
import groupImg from '../images/group.svg'

interface Props {
    results:Group[],
}

function Groups({results}: Props): ReactElement {
    let match = useRouteMatch();

    return (
        <div className={style.main} >
            <div className={style.header}>
                <div>Groups</div>
                <Link className={style.create} to={`${match.url}/createNew`}>Create new group</Link>
            </div>
            {results.length>0?
                <div className={style.box} >
                    {results.map((group)=>(
                        <Link className={style.group_item} to={`${match.url}/${group.id}`} >
                            <div><img className={style.group_image} src={groupImg}/></div>
                            <div className={style.name}>{group.name}</div>
                            <div className={style.users}>{group.users.length} subscribers</div>
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

export default withObjectList({lists:groups,})(Groups);
