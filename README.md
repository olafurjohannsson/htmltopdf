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
Both of these methods are what make up this package, the callback is in the classic Node style, basically a function that has two parameters, <strong>callback (error, success)</strong> which do what they imply, if success then no error, if not success then the error field is populated with the information needed to correctify.
</p>

<h2>Usage for <small>createFromHtml</small></h2>
<p>
The former method <i>createFromHtml(html, pdfName, callback)</i> takes in an HTML string and the name of the PDF to be created and the previously explained callback.
<div>
<pre>
htmltopdf.createFromHtml("&lt;html&gt;&lt;h1&gt;html&lt;/h1&gt;&lt;/html&gt;", "pdfName.pdf", function (err, success) { 
	... do stuff
});
</pre>
</div>
</p>

<p>
If you want to read in a file just use the <i>fs</i> module
<pre>
fs.readFile('file.html', function (err, data) {
	htmltopdf.createFromHtml(data, "pdfName.pdf", function (err, success) { 
		... do stuff
	});
});
</pre>
</p>

<h2>Usage for <small>createFromTemplateData</small></h2>

<p>
The latter method <i>createFromTemplateData(html, htmlData, pdfName, callback)</i> uses templates to create the PDF. You send in the template HTML, such as <pre>&lt;html&gt;&lt;h1&gt;{{data}}&lt;/h1&gt;&lt;/html&gt;</pre> 

<span>
where data is a JS object 
</span>
<pre>{{'data':'test'}}</pre> 

<span>The output would be</span>
<pre>
&lt;html&gt;&lt;h1&gt;test&lt;/h1&gt;&lt;/html&gt;
</pre>

<h3>Example:</h3>
<pre>
htmltopdf.createFromTemplateData("&lt;html&gt;&lt;h1&gt;{{data}}&lt;/h1&gt;&lt;/html&gt;", "{{'data':'test'}}", "pdfName.pdf", function (err, success) {
	if (success) {
		... do stuff
	}
});
</pre>

</p>

<h3>Example (see example.js):</h3>
<pre>
var htmltopdf = require('./htmltopdf'),
	fs = require('fs');

if (process.argv.length > 2) {
	var pdfName = process.argv[2];
	var html = process.argv[3];

	if (pdfName.indexOf('.pdf') > 0) {
		var htmlData = process.argv[4];
		
		// If htmlData is valid
		if (!!htmlData) {
			htmltopdf.createFromTemplateData(html, htmlData, pdfName, function (err, success) {
				if (success) {
					console.log('Success creating ' + pdfName);
				}
				else {
					console.log('Could not create PDF', err);
				}
			});
		}
		else {
			htmltopdf.createFromHtml(html, pdfName, function (err, success) {
				if (success) {
					console.log('Success creating ' + pdfName);	
				}
				else {
					console.log('Could not create PDF', err);
				}
			});
		}
	}
}


</pre>
