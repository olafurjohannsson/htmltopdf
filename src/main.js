var htmltopdf = require('./htmltopdf'),
	fs = require('fs');


if (process.argv.length > 2) {
	var html = process.argv[2];
	var pdfName = process.argv[3];

// 2. node ../src/main test.html test2.pdf true 

	if (html.length && pdfName.length) {
		if (pdfName.indexOf('.pdf') > 0) {
			var htmlData = process.argv[4];
			
			if (!!htmlData) {
				
				// HtmlTemplate can be a file or just data
				var func = null;
				var htmlFileExists = fs.existsSync(html);
				var isHtmlFile = html.indexOf('.html') > 0 && htmlFileExists;
				console.log('isHtmlFile', isHtmlFile);

				// if file exists on disk and has valid extension
				if (isHtmlFile) {
					func = htmltopdf.createFromTemplatePath;
				}
				else {
					func = htmltopdf.createFromTemplateData;
				}

				// Same interface, so we just assign the function to a variable
				if (func) {
					func(html, htmlData, function (err, success) {
						if (success) {
							console.log('Success creating ' + pdfName);
						}
					});
				}
			}	
			else {
				htmltopdf.createFromHtml(html, pdfName, function (err, success) {
					console.log(arguments);
				});
			}		
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