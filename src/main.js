
if (process.argv.length > 2) {
	var html = process.argv[2];
	var pdfName = process.argv[3];

	if (html.length && pdfName.length) {
		if (pdfName.indexOf('.pdf') > 0) {
			var htmltopdf = require('./htmltopdf');
			
			htmltopdf.createFromHtml(html, pdfName, function (err, success) {
				console.log(arguments);
			});
		}
		else {
			print('\'pdfName\' should contain .pdf extension!');
		}
	};
}
else {
	printUsage();
}

function print(message) {
	console.log(message);
}

function printUsage() {
	console.log('Send in string HTML and PDF name!');
}