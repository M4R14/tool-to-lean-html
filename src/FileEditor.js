import React from 'react';

// component: file editor
export function FileEditor(props) {
    const { fileName } = props;

    return (
        <div className='FileEditor'>
            <div className='FileEditor-header'>{fileName}</div>
            <div className='FileEditor-body'>
                {props.children}
            </div>
        </div>
    );
}
