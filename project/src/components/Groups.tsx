import React, { ReactElement } from 'react'
import { Group } from '../local/interfaces'
import { groups } from '../local/localdb'
import withObjectList from './withObjectList'

interface Props {
    results:Group[],
}

function Groups({results}: Props): ReactElement {
    return (
        <div>
            {results.length>0?
                <div>
                    {results.map((group)=>(
                        <div> {group.name} </div>
                    ))}
                </div>
            :
            <div>No groups</div>
            }
        </div>
    )
}

export default withObjectList({lists:groups})(Groups);
