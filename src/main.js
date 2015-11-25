var htmltopdf = require('./htmltopdf'),
	fs = require('fs');


if (process.argv.length > 2) {
	var pdfName = process.argv[2];
	var html = process.argv[3];

	if (pdfName.indexOf('.pdf') > 0) {
		var htmlData = process.argv[4];
		
		console.log('pdfName', pdfName);
		console.log('html', html);
		console.log('htmlData', htmlData);
		
		if (!!htmlData) {
			htmltopdf.createFromTemplateData(html, htmlData, function (err, success) {
				if (success) {
					console.log('Success creating ' + pdfName);
				}
				else {
					console.log(err, success);
				}
			});
		}
		else {
			htmltopdf.createFromHtml(html, pdfName, function (err, success) {
				console.log('Success creating ' + pdfName);
			});
		}
	}
	else {
		print('\'pdfName\' should contain .pdf extension!');
	}
}
else {
	printUsage();
}

function print(message) {
	console.log(message);
}

function printUsage() {
	console.log('Send in string HTML and PDF name!');
	console.log('Usage:');
	console.log('Creating from HTML: node src/main test.pdf <html><h1>test</h1></html>');
	console.log('Creating from HTML template: node src/main test.pdf <html><h1>{{test}}</h1></html> {test:123}');
}