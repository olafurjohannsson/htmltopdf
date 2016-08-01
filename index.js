var phantom = require('phantom'),
    handlebars = require('handlebars'),
    fs = require('fs');



// Function ctor
var PDF = function () {
    this.isWindows = process.platform === 'win32';
};


/*
    *** Private interface ***
*/

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
                
                page.set('onLoadFinished', function () {
                                        
                    // render page
                    return page.render(pdfName, function () {
                        
                        // Exit PhantomJS
                        ph.exit();
                        
                        // If callback
                        if (!!fn)
                            return fn(null, true);
                    });
                });
                
                
                // Set content in PhantomJS page
                page.set('content', html, function () {
                    
                });
            });
        }
        catch (e) {
            ph.exit();
            return fn(e, false);
        }
        
    }

    /*
        Render our PDF from HTML
    */
	var options = { parameters: { 'web-security': 'no' } };

	if (this.isWindows) {
		options['dnodeOpts'] = { weak: false };
	}

	phantom.create(function (ph) { render(ph, pdfName); }, options);
};

// Create from HTML template
PDF.prototype._create = function (htmlTemplateData, htmlData, pdfName, fn) {

    // Compile our Handlebars template
    var template = null;
    try {
        template = handlebars.compile(htmlTemplateData);
    } 
    catch (e) {
        return fn('Could not compile HTML template data', false);
    } 
    
    // If string
    if (!(htmlData instanceof Object)) {
        try {
            htmlData = JSON.parse(htmlData);
        }
        catch (e) {
            return fn('HTML is not valid JSON', false);
        }
    }
    
    // Generate HTML string from the template
    var html = null;
    try {
        html = template(htmlData);
    }
    catch (e) {
        return fn('Could not inject HTML data into template', false);
    }
    
    // Render it to PDF
    this._render(html, pdfName, fn);
};


/*
    *** Public Interface ***
*/

/* Create PDF from template and data
     @htmlTemplateData: The handlebars raw HTML template data
     @data:             The data to feed to handlebars template
     @pdfName:          The name of the outputted PDF
     @fn:               Callback which is called on error/success/fail
*/
PDF.prototype.createFromTemplateData = function (htmlTemplateData, data, pdfName, fn) {
    this._create(htmlTemplateData, data, pdfName, fn);
};

/* Create PDF from straight HTML
     @html:    HTML data with populated data        
     @pdfName: The name of the outputted PDF
     @fn:      Callback which is called on error/success/fail
*/
PDF.prototype.createFromHtml = function (html, pdfName, fn) {
    this._render(html, pdfName, fn);
};

// export our function
module.exports = new PDF();

