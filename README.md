<h1>HTML TO PDF</h1>

<p>
Yet another HTML to PDF convert. This is a package i made for myself to solve specific HTML conversion problems i had in my own projects.
</p>

<p>
The gist of it is that there are two methods
<ul>
<li>createFromHtml(html, pdfName, callback)</li>
<li>createFromTemplateData(html, htmlData, pdfName, callback)</li>
</ul>
</p>

<p>
Both of these methods are what make up this package, the callback is just a function that takes in two parameters, <strong>callback (error, success)</strong> which do what they imply, if success then no error, if not success the error field is populated with the information needed.
</p>

<p>
The former method <i>createFromHtml(html, pdfName, callback)</i> takes in HTML, the name of the PDF to be created and the previously explained callback
</p>

<p>
The latter method <i>createFromTemplateData(html, htmlData, pdfName, callback)</i> uses templates to create the PDF. You send in the template HTML, such as <blockquote>&gthtml&lt{{data}}&gt/html&lt</blockquote> and it's data <blockquote>{{'data':'test'}}</blockquote> <strong>
</p>

This package has two public methods
<h1>test</h1>
* createFromTemplateData(html, htmlData, pdfName, callback)
* createFromHtml(html, pdfName, callback)

Send in string HTML and PDF name!
Usage:
Creating from HTML: node src/main test.pdf <html><h1>test</h1></html>
Creating from HTML template: node src/main test.pdf "<html><h1>{{test}}</h1></html>" "{"test":123}"

The gist of this project is that it should encapsulate the functionality needed to create PDFs from HTML templates, or just pdf from HTML file/html string

I use Handlebars and Phantom-node to achieve this effect.

There should be support for win32/osx/nix
