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

// component prewiew html
function PreviewHtml({ htmlText }) {
  return (
    <div className='PreviewHtml' >
      <div dangerouslySetInnerHTML={{ __html: htmlText }} />
    </div>
  );
}

// convert rich html to lean html
function convertHtmlToMarkdown(htmlText) {
  const converter = new showdown.Converter();

  // relpace &quot; with " " in htmlText
  let html = htmlText.replace(/&quot;/g, "'");

  // replace &nbsp; with " " in htmlText
  html = html.replace(/&nbsp;/g, ' ');

  // replace &amp; with " " in htmlText
  html = html.replace(/&amp;/g, '');

  // replace \n\n with <br> in htmlText
  html = html.replace(/\n\n/g, '<br>');

  do {
    // remove span tag and keep its content
    html = html.replace(/<span[^>]*>([^<]*)<\/span>/g, '$1');
  } while (/<span[^>]*>([^<]*)<\/span>/g.test(html));

  // convert html to markdown
  let markdown = converter.makeMarkdown(html);

  // convert markdown to html
  html = converter.makeHtml(markdown);

  // add tab to html list element <li>, <ul>, <ol>
  html = html.replace(/<li>/g, '\t<li>');
  html = html.replace(/<ol>/g, '\t<ol>');

  return html;
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
