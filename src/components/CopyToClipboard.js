import React, { useEffect } from 'react';

// component copy to clipboard
export function CopyToClipboard({ text }) {
    const [hover, setHover] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    const [style, setStyle] = React.useState({
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        padding: '5px 10px',
        border: 'none',
        borderRadius: '0 5px 0 0',
        backgroundColor: '#fff',
        cursor: 'pointer',
    });

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);

        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    useEffect(() => {
        const fontWeightHover = {
            fontWeight: 'bold',
        };

        if (copied && hover || copied && !hover) {
            setStyle({
                ...style,
                ...fontWeightHover,
                backgroundColor: 'pink',
                color: '#000',
            });
        } else if (hover) {
            setStyle({
                ...style,
                ...fontWeightHover,
                backgroundColor: '#000',
                color: '#fff',
            });
        } else {
            setStyle({
                ...style,
                backgroundColor: '#fff',
                color: '#000',
                fontWeight: 'normal',
            });
        }
    }, [hover, copied]);


    return <div>
        <button onClick={copyToClipboard}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={style}
        >Copy to clipboard</button>
    </div>;
}
