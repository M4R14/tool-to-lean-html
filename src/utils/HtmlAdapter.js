import showdown from 'showdown';

// convert rich html to markdown
export class HtmlAdapter {
    constructor() {
        this.converter = new showdown.Converter();
    }

    convertToMarkdown(htmlText) {
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
        return this.converter.makeMarkdown(html);
    }
}
