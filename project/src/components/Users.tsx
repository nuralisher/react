import React, { ReactElement } from 'react'
import { User } from '../local/interfaces'
import { users } from '../local/localdb';
import withObjectList from './withObjectList'
import style from './css/groups.module.css'
import userImg from '../images/user.svg'

interface Props {
    results:User[],
}

function Users({ results,}: Props): ReactElement {
        return (
            <div className={style.main} >
                <div className={style.header}>
                    <div>Users</div>
                </div>
                {results.length>0?
                    <div className={style.box} >
                        {results.map((user)=>(
                            <div className={style.group_item}> 
                                <div><img className={style.group_image} src={userImg}/></div>
                                <div className={style.name}>{user.name}</div>
                                <div className={style.users}>{user.email}</div>
                            </div>
                        ))}
                    </div>
                :
                <div className={style.box}>
                    <div className={style.no_group}>No users</div>
                </div>
                }
            </div>
        );
  }

export default withObjectList({lists:users,})(Users);
