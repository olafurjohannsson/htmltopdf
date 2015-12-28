var htmltopdf = require('./index');


// Create PDF file from template using handlebars
function fromTemplate() {
	console.log('Creating from template');
	var pdfName = 'fromTemplate.pdf';
	htmltopdf.createFromTemplateData("<html><h1>{{data}}</h1></html>", {'data':'fromTemplate'}, pdfName, function (err, success) {
		if (success) {
			console.log('Success creating ' + pdfName);
		}
		else {
			console.log('Could not create PDF', err);
		}
	});
}


// Create PDF file from HTML
function fromHtml() {
	console.log('Creating from html');
	var pdfName = 'fromHtml.pdf';
	htmltopdf.createFromHtml("<html><h1>fromHtml</h1></html>", pdfName, function (err, success) {
		if (success) {
			console.log('Success creating ' + pdfName);	
		}
		else {
			console.log('Could not create PDF', err);
		}
	});
}



fromTemplate();
fromHtml();