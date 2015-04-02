describe('initial test package', function(){
        
    it ('automates login with username', function(){
    	//get pageobj
        var page = require('../KT/curate.po.js');
        //get started
		page.getLandingPage();
		//perform login
		page.loginWithUsername('sergey+1@knowledgetree.com', '1Qasdfghj');
		page.validateLoggedInProperly('sergey+1@knowledgetree.com');
		//page.closeBrowserWnd();
		page.ktLogOut();
	});

});
