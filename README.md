<h1>HTML TO PDF</h1>

<p>
Yet another HTML to PDF converter. This is a package i made to solve specific HTML conversion problems i had in one of my projects.
</p>

<p>
The gist of it is that there are two methods
<ul>
<li>createFromHtml (html, pdfName, callback)</li>
<li>createFromTemplateData (html, htmlData, pdfName, callback)</li>
</ul>
</p>

<p>
Both of these methods are what make up this package, the callback is a function that takes in two parameters, <strong>callback (error, success)</strong> which do what they imply, if success then no error, if not success then the error field is populated with the information needed to correctify.
</p>

<p>
The former method <i>createFromHtml(html, pdfName, callback)</i> takes in HTML, the name of the PDF to be created and the previously explained callback

<h2>Usage for <small>createFromHtml</small></h2>
<code>
htmltopdf.createFromHtml("&lthtml&gt&lth1&gthtml&lt/h1&gt&lt/html&gt, "pdfName.pdf", function (err, success) { ... });
</code>

</p>



<p>
The latter method <i>createFromTemplateData(html, htmlData, pdfName, callback)</i> uses templates to create the PDF. You send in the template HTML, such as <blockquote>&gthtml&lt{{data}}&gt/html&lt</blockquote> and it's data <blockquote>{{'data':'test'}}</blockquote> <strong>
</p>

