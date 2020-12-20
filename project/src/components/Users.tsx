import React, { ReactElement, useEffect } from 'react'
import { User } from '../local/interfaces'
import { users } from '../local/localdb';
import withObjectList from './withObjectList'
import style from './css/groups.module.css'
import userImg from '../images/user.svg'
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../local/actionType';

interface Props {
}

function Users({}: Props): ReactElement {
    const userList:User[] = useSelector((state:any) => state.userReducer.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: ActionType.SETUSERS, users})
    }, [])

    return (
        <div className={style.main} >
            <div className={style.header}>
                <div>Users</div>
            </div>
            {userList.length>0?
                <div className={style.box} >
                    {userList.map((user)=>(
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

// export default withObjectList({lists:users,})(Users);
export default Users;