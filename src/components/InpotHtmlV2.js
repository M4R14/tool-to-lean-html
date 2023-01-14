import React, { useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import { CopyToClipboard } from './CopyToClipboard';

// component input html document v2
export function InpotHtmlV2({ value, onChange }) {
    const [htmlText, setHtmlText] = React.useState('');

    // handle input change
    const onChangeHandler = (code) => {
        setHtmlText(code);
        onChange && onChange(code);
    };

    useEffect(() => {
        setHtmlText(value || '');
    }, [value]);

    return <div style={{
        position: 'relative',
    }} >
        <CopyToClipboard text={htmlText} />
        <Editor
            value={htmlText}
            onValueChange={code => onChangeHandler(code)}
            highlight={code => highlight(code, languages.html, 'html')}
            placeholder="Paste your html document here..."
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                color: '#000',
                backgroundColor: '#f5f5f5',
                borderRadius: 5,
            }}
        />
    </div>
}
