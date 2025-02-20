import React from 'react';

function InvokeCommandButton({ onClick }: any) {

    return (
        <button type="button" onClick={onClick}>INVOKE COMMAND</button>
    )
}

export default InvokeCommandButton;