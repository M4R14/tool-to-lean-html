import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

// component input html document v2
export function InpotHtmlV2({ onChange }) {
    const [htmlText, setHtmlText] = React.useState('');

    // handle input change
    const onChangeHandler = (code) => {
        setHtmlText(code);
        onChange(code);
    };

    return <Editor
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
    />;
}
