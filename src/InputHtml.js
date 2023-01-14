import React from 'react';
import { getScreenHeight } from './App';

const placeholder = `<h1 id="welcometomywebsite">Welcome to my website</h1>

<p  >This is some dummy content for my website. Feel free to replace it with your own content.</p>

<ul class="blod">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<p><img src="https://via.placeholder.com/150" alt="Placeholder Image" /></p>
`;

// component input html document
export function InputHtml(props) {
    const [htmlText, setHtmlText] = React.useState('');
    const [line, setLine] = React.useState(0);

    // handle input change
    const onChange = (val) => {
        setHtmlText(val);
        props.onChange(val);
    }

    React.useEffect(() => {
        // get number of lines in textarea
        const lines = htmlText.split('\n').length;
        setLine(lines);
    }, [htmlText]);

    const rows = line || placeholder.split('\n').length;

    return (
        <textarea
            style={{
                backgroundColor: '#44475a',
                color: '#f8f8f2',
                borderRadius: '0px 0px 5px 5px',
                border: 'none',
                width: '100%',
                height: '100%',
                padding: '10px',
            }}
            rows={rows} cols="50" placeholder={placeholder}
            onChange={(e) => { onChange(e.target.value); }}
        >{htmlText}</textarea>
    );
}
