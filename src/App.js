import React, { useState, useEffect } from 'react';
import showdown from 'showdown';
import './App.css';
import { CopyBlock, dracula } from "react-code-blocks";
import { InputHtml } from './InputHtml';
import { FileEditor } from './FileEditor';


// get full screen height
export function getScreenHeight() {
  return Math.floor(window.innerHeight / 20);
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
      <div style={{
        textAlign: 'center',
      }} >
        <img src='https://hits.sh/m4r14.github.io/tool-to-lean-html.svg' />
        <p>
          Simplifying complex HTML code by removing unnecessary elements to reduce file size and improve performance.
        </p>
      </div>
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
                  style={{
                    fontSize: '1rem',
                    height: `${getScreenHeight()}rem`,
                  }}
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
          padding: '1rem',
        }}>
          Created by <a href='https://github.com/M4R14' target='_blank' rel='noreferrer' >M4R14</a>
        </p>
      </footer>
    </div >
  );
}

export default App;
