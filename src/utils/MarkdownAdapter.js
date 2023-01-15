import showdown from 'showdown';

function markdownToHtmlTable(markdownTable) {
    console.log('markdownToHtmlTable | markdownTable', markdownTable);

    const rows = markdownTable.split("\n");

    const headers = rows[0].split("|").map(header => header.trim());
    const data = rows.slice(2).map(row => {
        const columns = row.split("|").map(column => column.trim());
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = columns[index];
        });
        return obj;
    });

    let htmlTable = "<table>\n";
    htmlTable += "\t<tr>\n";
    headers.forEach(header => {
        htmlTable += "\t\t<th>" + header + "</th>\n";
    });
    htmlTable += "\t</tr>\n";

    data.forEach(row => {
        htmlTable += "\t<tr>\n";
        headers.forEach(header => {
            htmlTable += "\t\t<td>" + row[header] + "</td>\n";
        });
        htmlTable += "\t</tr>\n";
    });

    htmlTable += "</table>\n";
    return htmlTable;
}


// convert markdown to html
export class MarkdownAdapter {
    constructor() {
        this.converter = new showdown.Converter();
    }

    // detect markdown table and convert it to html table
    convertMarkdownTableToHtmlTable(markdown) {
        let html = markdown;

        console.log('markdown', markdown);

        let foundTable = false;

        let markdownTable = [];

        let lineIndex = 0;


        // detect markdown table and convert it to html table
        for (const line of markdown.split('\n')) {
            switch (true) {
                // detect start of table, start with <p>| and end with |
                case /<p>\|(.*)\|/g.test(line):
                    console.log('start of table', line);
                    foundTable = true;
                    markdownTable.push(line);
                    break;

                // detect end of table, start with | and end with |</p>
                case /\|<\/p>/g.test(line):
                    console.log('end of table', line);
                    foundTable = false;
                    markdownTable.push(line);

                    // replace markdown table with html table
                    const markdownTableString = markdownTable.join('\n');

                    console.log('markdownTableString', markdownTableString);

                    // remove <p> and </p> from markdown table
                    const markdownTableStringWithoutP = markdownTableString.replace(/<p>/g, '').replace(/<\/p>/g, '');

                    // convert markdown table to html table
                    const htmlTable = markdownToHtmlTable(markdownTableStringWithoutP);

                    // replace markdown table with html table
                    html = html.replace(markdownTableString, htmlTable);

                    // reset markdown table
                    markdownTable = [];
                    break;

                // detect middle of table, start with | and end with |
                case foundTable:
                    console.log('middle of table', line);
                    markdownTable.push(line);
                    break;

                default:
                    break;
            }

            lineIndex++;
        }

        return html;
    }

    // convert markdown to rich html
    convertToHtml(markdown) {
        console.log('convertMarkdownToHtml | markdown:', markdown);

        // convert markdown to html
        let html = this.converter.makeHtml(markdown);

        // detect markdown table and convert it to html table
        html = this.convertMarkdownTableToHtmlTable(html);

        // remove <!-- --> comments from html
        html = html.replace(/<!--[\s\S]*?-->/g, '');

        // add tab to html list element <li>, <ul>, <ol>
        html = html.replace(/<li>/g, '\t<li>');
        html = html.replace(/<ol>/g, '\t<ol>');

        return html;
    }
}
