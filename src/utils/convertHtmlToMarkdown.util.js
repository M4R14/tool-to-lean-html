import { MarkdownAdapter } from './MarkdownAdapter';
import { HtmlAdapter } from './HtmlAdapter';

// convert rich html to lean html
export function convertHtmlToMarkdown(htmlText, injects = {
    markdownAdapter: new MarkdownAdapter(),
    htmlAdapter: new HtmlAdapter(),
}) {
    const { markdownAdapter, htmlAdapter } = injects;

    let markdown = htmlAdapter.convertToMarkdown(htmlText);

    console.log('convertHtmlToMarkdown | markdown:', markdown);

    return markdownAdapter.convertToHtml(markdown);
}
