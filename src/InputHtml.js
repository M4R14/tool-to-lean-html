import React from 'react';
import { getScreenHeight } from './App';

// component input html document
export function InputHtml(props) {
    const rows = getScreenHeight();
    return (
        <textarea
            style={{
                backgroundColor: '#44475a',
                color: '#f8f8f2',
                borderRadius: '0px 0px 5px 5px',
                border: 'none',
                width: '100%',
                height: '100%',
            }}
            rows={rows} cols="50" placeholder='input html document'
            onChange={(e) => { props.onChange(e.target.value); }}
        ></textarea>
    );
}
