
var pdf = require('./pdf');

var testHtml = '<html><h1>test</h1></html>';
var testPdfName = 'test.pdf';

pdf.create(testHtml, testPdfName, function (err, success) {
	console.log(err, success);
});

