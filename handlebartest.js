var fs = require('fs'),
    handlebars = require('./handlebars'),
    phantom = require('phantom');

var data = {
    title: 'practical node.js',
    author: '@azat_co',
    tags: ['express', 'node', 'javascript']
}



function PDF () {
    this.isWindows = process.platform === 'win32';
}

PDF.prototype.render = function (html, pdfName, fn) {
    // We have HTML
    if (html.length) {
        
        // If windows
        if (this.isWindows) {
                
            // Create phantom bridge
            phantom.create(function (ph) {
                    
                // Create page
                return ph.createPage(function (page) {
                        
                    // Set viewport size
                    /*
                    page.set('viewportSize', {
                        width: 1920,
                        height: 1080
                    });
                    */
                        
                    // Set HTML content
                    page.set('content', html);
                            
                    // render as PDF
                    return page.render(pdfName, function () {
                        fn(null, true);
                        ph.exit();
                        return;
                    });
                });
            }, {
                    dnodeOpts: { weak: false }
                });
        }
        else {
            // OSX/NIX
        }
    }
    else {
        fn('Could not create PDF', false);
    }
}

// Get a HTML template path with data and create PDF from that
PDF.prototype.create = function (htmlTemplatePath, htmlData, pdfName, fn) {
    var that = this;
    // Open template
    fs.readFile(htmlTemplatePath, 'utf-8', function (error, source) {
        // Some error 
        if (error) {
            fn(error, false);
            return;
        }
        
        // create our HTML file
        var template = handlebars.compile(source);
        var html = template(data);
        
        // Create our PDF from HTML
        that.render(html, pdfName, fn);

    });
}

var p = new PDF();

p.create('test.html', data, 'test.pdf', function () {
    console.log(arguments);
});