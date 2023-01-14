import React, { useState, useEffect } from 'react';
import './App.css';
import { FileEditor } from './components/FileEditor';
import { InpotHtmlV2 } from './components/InpotHtmlV2';
import { convertHtmlToMarkdown } from './utils/convertHtmlToMarkdown.util';

// get full screen height
export function getScreenHeight() {
  return Math.floor(window.innerHeight / 20);
}

// component prewiew html
function PreviewHtml({ htmlText }) {
  return (
    <div className='PreviewHtml' >
      <div dangerouslySetInnerHTML={{ __html: htmlText }} />
    </div>
  );
}

function App() {
  const [htmlText, setHtmlText] = useState('');
  const [leanHtmlText, setLeanHtmlText] = useState('');

  useEffect(() => {
    // convert rich html to lean html
    const leanHtml = convertHtmlToMarkdown(htmlText);

    // output html document
    setLeanHtmlText(leanHtml);

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
          <InpotHtmlV2 onChange={val => setHtmlText(val)} />
          {/* <InputHtml onChange={val => setHtmlText(val)} /> */}
        </FileEditor>
        <FileEditor fileName='lrean-content.html'>

          {
            leanHtmlText
              ? <InpotHtmlV2 value={leanHtmlText} />
              : <div style={{ color: 'gray' }} >output lean html document</div>
          }
        </FileEditor>
        <FileEditor fileName='Preview Html | rich-content.html'>
          <PreviewHtml htmlText={htmlText} />
        </FileEditor>
        <FileEditor fileName='Preview Html | lean-content.html'>
          <PreviewHtml htmlText={leanHtmlText} />
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
