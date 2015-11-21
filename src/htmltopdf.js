var phantom = require('phantom'),
	handlebars = require('./handlebars'), // TODO: should not be local file
	fs = require('fs');



var PDF = function () {
	this.isWindows = process.platform === 'win32';
};


PDF.prototype._render = function (html, pdfName, fn) {

	if (!html) {
		throw new Error('Empty HTML string!');	
	}
	
	if (!pdfName) {
		throw new Error('Empty PDF name!');
	}

	function render(ph, pdfName) {
		
		// Try to render PDF from HTML
		try {	
			// Create PhantomJS page
			return ph.createPage(function (page) {
				
				// A4 as our papersize
				page.set('paperSize', {
					format: 'A4'
				});
				
				// Set content in PhantomJS page
				page.set('content', html);

				// render page
				return page.render(pdfName, function () {
					
					// Exit PhantomJS
					ph.exit();
					
					// If callback
					if (fn)
						fn(null, true);
				});
			});
		}
		catch (e) {
			ph.exit();
			fn(e, false);
		}
		
		return true;
	}

	/*
		Render our PDF from HTML
	*/
	if (this.isWindows) {
		phantom.create(function (ph) { render(ph, pdfName); }, { dnodeOpts: { weak: false } });
	}
	else {
		phantom.create(function (ph) { render(ph, pdfName); });
	}
};

// Create from HTML template
PDF.prototype._create = function (htmlTemplateData, htmlData, pdfName, fn) {
	
	// Compile our Handlebars template
	var template = handlebars.compile(htmlTemplateData);
	
	// Generate HTML string from the template
	var html = template(htmlData);

	// Render it to PDF
	this._render(html, pdfName, fn);
};

// Create PDF from template and path, specifying where the template is
PDF.prototype.createFromTemplatePath = function (htmlTemplatePath, htmlData, pdfName, fn) {
	
	// Read htmlTemplate
	fs.readFile(htmlTemplatePath, function (error, data) {
		if (error) {
			fn(error, false);
			return;
		}

		this._create(data, htmlData, pdfName, fn);
	});
};

// Create PDF from template and data
PDF.prototype.createFromTemplateData = function (htmlTemplateData, htmlData, pdfName, fn) {
	this._create(htmlTemplateData, htmlData, pdfName, fn);
};

// Create PDF from straight HTML
PDF.prototype.createFromHtml = function (html, pdfName, fn) {
	this._render(html, pdfName, fn);
};

// export our function
module.exports = new PDF();