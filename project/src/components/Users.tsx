import React, { ReactElement } from 'react'
import { User } from '../local/interfaces'
import { users } from '../local/localdb';
import withObjectList from './withObjectList'

interface Props {
    results:User[],
}

function Users({ results,}: Props): ReactElement {
        return (
            <div>
                {results.length>0?
                    <div>
                        {results.map((user)=>(
                            <div> {user.name} </div>
                        ))}
                    </div>
                :
                <div>No users</div>
                }
            </div>
        );
  }

export default withObjectList({lists:users})(Users);
