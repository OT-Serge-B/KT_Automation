describe('initial test package', function(){
        
    xit ('automates login with username', function(){
    	//get pageobj
        var page = require('./PageObj.js');
        //get started
		page.getLandingPage();
		//perform login
		page.loginWithUsername('sergey+1@knowledgetree.com', '1Qasdfghj');
		page.validateLoggedInProperly();
		page.closeBrowserWnd();
	});
		
	it('automates login as sf user into ktmc', function () {
        //get pageobj
        var page = require('./PageObj.js');
        //get started
		page.getLandingPage();
		//perform login
		page.loginAsSFUser('sergey@knowledgetree.com', '1Qasdfghj');
		waits(8000);
		page.validateLoggedInProperly();
		page.closeBrowserWnd();
	});
		
	it('automates login into kt4sf', function () {
		//get pageobj
        var page = require('./PageObj.js');
        //get started
		page.getSFLandingPage();
		//perform login
		page.SFlogin('sergey@knowledgetree.com', '1Qasdfghj');	
		page.validateLoggedInProperly();
		//page.closeBrowserWnd();
	});

});
