describe('initial test package', function(){
    it('automates login as sf user into ktmc', function () {
        //get pageobj
        var page = require('./PageObj.js');
        //get started
		page.getLandingPage();
		//perform login
		page.loginAsSFUser('sergey@knowledgetree.com', '1Qasdfghj');
		waits(20000);
		});
    
    it ('automates login with username', function(){
    	//get pageobj
        var page = require('./PageObj.js');
        //get started
		page.getLandingPage();
		//perform login
		page.loginWithUsername('sergey+1@knowledgetree.com', '1Qasdfghj');
		waits(20000);
		});
});
