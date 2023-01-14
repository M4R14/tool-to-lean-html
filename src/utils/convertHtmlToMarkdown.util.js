import showdown from 'showdown';

// convert rich html to lean html
export function convertHtmlToMarkdown(htmlText) {
    const converter = new showdown.Converter();

    // relpace &quot; with " " in htmlText
    let html = htmlText.replace(/&quot;/g, "'");

    // replace &nbsp; with " " in htmlText
    html = html.replace(/&nbsp;/g, ' ');

    // replace &amp; with " " in htmlText
    html = html.replace(/&amp;/g, '');

    do {
        // remove span tag and keep its content
        html = html.replace(/<span[^>]*>([^<]*)<\/span>/g, '$1');
    } while (/<span[^>]*>([^<]*)<\/span>/g.test(html));

    do {
        // remove span tag with out content
        html = html.replace(/<span[^>]*><\/span>/g, '');
    } while (/<span[^>]*><\/span>/g.test(html));

    // convert html to markdown
    let markdown = converter.makeMarkdown(html);

    // convert markdown to html
    html = converter.makeHtml(markdown);

    // remove <!-- --> comments from html
    html = html.replace(/<!--[\s\S]*?-->/g, '');

    // add tab to html list element <li>, <ul>, <ol>
    html = html.replace(/<li>/g, '\t<li>');
    html = html.replace(/<ol>/g, '\t<ol>');

    return html;
}
