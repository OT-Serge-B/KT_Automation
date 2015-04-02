describe('initial test package', function(){
	
	it ('automates login with username (with validation), go to assets list and and adds a url-asset (with validation),'+
		' goes to assets list and vaidate added asset presented, then delete just added asset (with validation), then logout',
		function(){
    	//get pageobj
        var curatePage = require('../KT/curate.po.js');
        //get started
		curatePage.getLandingPage();
		//perform login and validate that user logged correctly
		curatePage.loginWithUsername('sergey+1@knowledgetree.com', '1Qasdfghj');
		curatePage.validateLoggedInProperly('sergey+1@knowledgetree.com');
		//click add button to add asset
		curatePage.addNewAsset();
		
		//add link asset
		var addAssetPage = require('../KT/addAsset.po.js');
		var linkText = addAssetPage.addLinkAsset()
		
		//validate that asset added 
		//1. message with View Assets link appears
		expect(element(by.partialLinkText('View assets')).isPresent()).toBe(true);
		//2. amid recent assets we have our newly added 
		element(by.partialLinkText('View assets')).click();
		expect(element(by.linkText(linkText)).isPresent()).toBe(true);
		//3.go and validate that asset appears in the list on curate
		addAssetPage.menuAssets.click();
		curatePage.validateAssetExists(linkText);
		
		//delete asset
		curatePage.deleteAssetFromAssetsList(linkText);
		//validate asset deleted properly
		curatePage.validateAssetNotExist(linkText);
		//logout
		curatePage.ktLogOut();
	});

});
