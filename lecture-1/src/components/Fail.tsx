import React, { ReactElement } from 'react'

interface Props {
    reason:string,
}

export default function Fail({reason}: Props): ReactElement {
    return (
        <div>
            <p>Oh no! It is FAILED</p>
            <div className="message">Because: {reason}</div>
        </div>
    )
}
