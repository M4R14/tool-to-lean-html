import React, { useState, useEffect } from 'react';
import showdown from 'showdown';
import './App.css';
import { CopyBlock, dracula } from "react-code-blocks";


// get full screen height
function getScreenHeight() {
  return Math.floor(window.innerHeight / 20);
}

// component input html document
function InputHtml(props) {
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
      onChange={(e) => { props.onChange(e.target.value) }}
    ></textarea>
  );
}


// component: file editor
function FileEditor(props) {
  const { fileName } = props;

  return (
    <div className='FileEditor'>
      <div className='FileEditor-header' >{fileName}</div>
      <div className='FileEditor-body' >
        {props.children}
      </div>
    </div>
  );
}

function App() {
  const [htmlText, setHtmlText] = useState('');
  const [leanHtmlText, setLeanHtmlText] = useState('');

  useEffect(() => {
    const converter = new showdown.Converter();

    // convert html to markdown
    const markdown = converter.makeMarkdown(htmlText);

    // convert markdown to html
    const html = converter.makeHtml(markdown);

    // output html document
    setLeanHtmlText(html);

  }, [htmlText]);


  return (
    <div className="App">
      <h1 style={{
        textAlign: 'center',
      }}>
        Convert rich HTML to lean HTML
      </h1>
      <p style={{
        textAlign: 'center',
      }}>
        Simplifying complex HTML code by removing unnecessary elements to reduce file size and improve performance.
      </p>
      <div className='App-layout' >
        <FileEditor fileName='rich-centent.html'>
          <InputHtml onChange={val => setHtmlText(val)} />
        </FileEditor>
        <FileEditor fileName='lrean-content.html'>
          {
            leanHtmlText
              ? (
                <CopyBlock
                  language="html"
                  showLineNumbers={true}
                  wrapLines={true}
                  text={leanHtmlText || 'output markdown document'}
                  theme={dracula}
                />
              )
              : <div style={{
                color: 'gray',
              }} >output lean html document</div>
          }

        </FileEditor>
      </div>
      <footer>
        <p style={{
          textAlign: 'center',
        }}>
          <a href='' >Github</a>
        </p>
      </footer>
    </div >
  );
}

export default App;
