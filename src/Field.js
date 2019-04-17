import React from 'react'

const Field = (props) => {
    return (
        <div
            onClick={props.onUserClick}
            className={props.className}
        >
        </div>
    )
}

export default Field
