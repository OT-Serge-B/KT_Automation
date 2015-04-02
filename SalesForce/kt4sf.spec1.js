describe('initial test package', function(){
	xit('automates login into kt4sf', function () {
		//get pageobj
        var page = require('../SalesForce/kt4sf.po.js');
        //get started
		page.getSFLandingPage();
		//perform login
		page.SFlogin('sergey@knowledgetree.com', '1Qasdfghj');	
		page.validateLoggedInProperly();
		//page.closeBrowserWnd();
	});

});
