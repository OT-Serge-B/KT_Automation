describe('initial test package', function(){
		
	xit('automates login as sf user into ktmc', function () {
        //get pageobj
        var page = require('../KT/curate.po.js');
        //get started
		page.getLandingPage();
		//perform login
		page.loginAsSFUser('sergey@knowledgetree.com', '1Qasdfghj');

		page.validateLoggedInProperly('---');
		//page.ktLogOut()
	});
});
