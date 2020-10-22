import React, { ReactElement } from 'react'
import { Link, Redirect, Route, useRouteMatch } from 'react-router-dom'
import { Group } from '../local/interfaces'
import { groups } from '../local/localdb'
import withObjectList from './withObjectList'

interface Props {
    results:Group[],
}

function Groups({results}: Props): ReactElement {
    let match = useRouteMatch();

    return (
        <div>
            {results.length>0?
                <div>
                    {results.map((group)=>(
                        <div><Link to={`${match.url}/${group.id}`} > {group.name} </Link></div>
                    ))}
                </div>
            :
            <div>No groups</div>
            }
            <Link to={`${match.url}/createNew`}>Create new group</Link>

            
            
        </div>
    )

}

export default withObjectList({lists:groups,})(Groups);
