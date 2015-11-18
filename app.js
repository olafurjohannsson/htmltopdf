var renderPdf = function (session, cb) {
	var page;

	try {
		session.createPage(function (_page) {
			page = _page;

			var file = 'file.pdf';
			page.render(file, function () {
				page.close();
				page = null;
				return cb(null, file);
			});
		});
	}
	catch (e) {
		console.log(e);
		try {
			if (page != null) {
				page.close();
			}
		}
		catch (ex) {
			console.log(ex);
		}
		return cb('Exception rendering pdf:', e.toString());
	}
};

/*
var webPage = require('webpage');
var page = webPage.create();

page.viewportSize = { width: 1920, height: 1080 };

page.open("http://www.google.com", function starts (status) {
   page.render('google.jpeg', {
      format: 'jpeg', quality: '100' });
   phantom.exit();
});
*/