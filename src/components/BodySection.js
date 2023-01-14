import React, { useState, useEffect } from "react";
import { FileEditor } from "./FileEditor";
import { InpotHtmlV2 } from "./InpotHtmlV2";
import { convertHtmlToMarkdown } from "../utils/convertHtmlToMarkdown.util";

// get full screen height
export function getScreenHeight() {
    return Math.floor(window.innerHeight / 20);
}

// component prewiew html
export function PreviewHtml({ htmlText }) {
    return (
        <div className="PreviewHtml">
            <div dangerouslySetInnerHTML={{ __html: htmlText }} />
        </div>
    );
}

export const exampleHtml = `<h1>Article Title</h1>
<p>This is the introduction to the article.</p>
<h2>Section 1</h2>
<p>This is the first section of the article.</p>
<h2>Section 2</h2>
<p>This is the second section of the article.</p>
<h3>Subsection</h3>
<p>This is a subsection within the second section.</p>
<h4>List of items</h4>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
<h4>Steps to follow</h4>
<ol>
  <li>Step 1</li>
  <li>Step 2</li>
  <li>Step 3</li>
</ol>
<h2>Section 3</h2>
<p>This is the final section of the article.</p>`;

// main component: Body of the page
export function BodySection() {
    const [htmlText, setHtmlText] = useState(exampleHtml);
    const [leanHtmlText, setLeanHtmlText] = useState("");

    useEffect(() => {
        // convert rich html to lean html
        const leanHtml = convertHtmlToMarkdown(htmlText);

        // output html document
        setLeanHtmlText(leanHtml);
    }, [htmlText]);

    return (
        <div className="App-layout">
            <FileEditor fileName="rich-centent.html">
                <InpotHtmlV2 value={htmlText} onChange={(val) => setHtmlText(val)} />
            </FileEditor>
            <FileEditor fileName="lrean-content.html">
                {leanHtmlText ? (
                    <InpotHtmlV2 value={leanHtmlText} />
                ) : (
                    <div style={{ color: "gray" }}>output lean html document</div>
                )}
            </FileEditor>
            <FileEditor fileName="Preview Html | rich-content.html">
                <PreviewHtml htmlText={htmlText} />
            </FileEditor>
            <FileEditor fileName="Preview Html | lean-content.html">
                <PreviewHtml htmlText={leanHtmlText} />
            </FileEditor>
        </div>
    );
}
