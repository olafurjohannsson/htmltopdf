
/*
	TODO: 
	-- Send in name of HTML template (or just the template as a string)
	-- Send in outputted PDF name
	-- Send in data
	-- Parameter to specify if this should be saved as a file or returned as html


*/


var phantom = require('phantom'),
	handlebars = require('handlebars'),
	fs = require('fs');


var data = {
  title: 'practical node.js',
  author: '@azat_co',
  tags: ['express', 'node', 'javascript']
}

function pdfify () {

	this.create = function (inputFilename, outputFilename) {

		if (process.platform == 'win32') {
			phantom.create(function(ph) {
			    return ph.createPage(function(page) {
			      return page.open(inputFilename, function(status) {
			      	console.log(status);
			      	return page.render(outputFilename, function () {
		      			ph.exit();
			      	});
			      });
			  });
			}, {
			    dnodeOpts: {weak: false}
			});
		}
		else {
			phantom.create(function (ph) {
			  ph.createPage(function (page) {
			    page.open("http://www.google.com", function (status) {
			      page.evaluate(function () { return document.title; }, function (result) {
			        ph.exit();
			      });
			    });
			  });
			});
		}
	}

};


fs.readFile('test.html', 'utf-8', function(error, source){
  handlebars.registerHelper('custom_title', function(title){
    var words = title.split(' ');
    for (var i = 0; i < words.length; i++) {
      if (words[i].length > 4) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
    }
    title = words.join(' ');
    return title;
  })

  var template = handlebars.compile(source);
  var html = template(data);
  console.log(html)
});

module.exports = pdfify;

if (process.argv.length > 2) {
	var args = process.argv.slice(2);

	// for testing
	if (args[0] == 'test') {
		var f = new pdfify();
		f.create('http://www.google.com', 'test.pdf');		
	}
};

/*
CURRENT CODE:
'use strict';

var webPage = require('webpage'),
	page = webPage.create(),
	system = require('system');

var htmlName = system.args[1];
var pdfName = system.args[2];

page.open(htmlName, function (status) {
	page.paperSize = {
		width: '210mm',
		height: '297mm',
		format: 'A4',
		orientation: 'portrait' 
	};

	page.render(pdfName, { format: 'pdf', quality: 100 });
	phantom.exit();
});

page.onResourceRequested = function (data, req) {
	
};

page.onLoadFinished = function () {
	
};
*/