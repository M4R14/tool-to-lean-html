import React from 'react';
import './App.css';
import { BodySection } from './components/BodySection';

function App() {
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
      <BodySection />
      <footer>
        <div style={{
          textAlign: 'center',
        }}>
          <p>Copyright © 2020 <a href="https://github.com/m4r14" target="_blank" >m4r14</a> - Tool to Lean HTML</p>
          <p><a href="https://github.com/m4r14/tool-to-lean-html" target="_blank" >Source Code</a> | <a href="https://github.com/m4r14/tool-to-lean-html/issues" target="_blank"  >Report an Issue</a></p>
        </div>
      </footer>
    </div >
  );
}

export default App;
