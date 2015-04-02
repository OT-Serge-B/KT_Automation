var addAssetPage = function() {
	
	//main menu items
	this.menuAssets = element(by.linkText('Assets'));
	
	this.txtUrl  = element(by.id('inputWebsiteUrl'));
	this.txtName = element(by.id('inputWebsiteTitle'));
	this.btnAdd  = element(by.buttonText('Add'));
	this.servs = element.all(by.repeater('service in services'));
	
	
	this.addLinkAsset = function(){	
		browser.waitForAngular();
		this.clickWebPageAsset();
		//populate title (populate it before url, so - it's not copy of url)
		var currdate = new Date();
		var title = 'Beavis_' + currdate;
		this.txtName.sendKeys(title);
		//populate url
		this.txtUrl.sendKeys('http://upload.wikimedia.org/wikipedia/en/b/ba/Cornholio.jpg');
		//add new asset
		this.btnAdd.click();
		return title
	}
	
	
	this.addSomeAsset = function(){		
		
		//choose asset
		
		//browser.driver.switchTo().frame(0);//(browser.element(by.css('[class="kt-filepicker-iframe"]')));
		//element(by.css('[name="Testing.pdf"]')).click();
		//element(by.css('[class="btn-upload"]')).click();
		//browser.driver.switchTo().defaultContent();
		//var asset = browser.element(by.css('[name="Testing.pdf"]'));
		//asset.click();
		//waits(10000);
		
		//click Assets->Add
		this.clickGDriveAsset();

		
		expect(element.all(by.repeater('service in services')).count()).toBe(11);
		element.all(by.repeater('service in services')).then(function(srv){
			srv[1].element(by.partialLinkText('Salesforce')).click();
			srv[2].element(by.partialLinkText('Box')).click();
			srv[3].element(by.partialLinkText('Marketo')).click();
			srv[4].element(by.partialLinkText('Gmail')).click();
			srv[5].element(by.partialLinkText('Google Drive')).click();
			srv[6].element(by.partialLinkText('Dropbox')).click();
			srv[7].element(by.partialLinkText('OneDrive')).click();
			srv[0].element(by.partialLinkText('Web Page')).click();
		});

	}
	
	this.clickWebPageAsset = function(){
		//select source from list of available
		browser.get("https://manager-stable.knowledgetree.com/add");
		//waits(10000);
		element.all(by.repeater('service in services')).then(function(srv){
			srv[0].element(by.partialLinkText('Web Page')).click();
		});
	}
	
	this.clickGDriveAsset = function(){
		//select source from list of available
		browser.waitForAngular();
		element.all(by.repeater('service in services')).then(function(srv){
			srv[5].element(by.partialLinkText('Google Drive')).click();
		});
	}
	
	/*element.all(by.repeater('service in services')).then(function(srv){
			srv[1].element(by.partialLinkText('Salesforce')).click();
			srv[2].element(by.partialLinkText('Box')).click();
			srv[3].element(by.partialLinkText('Marketo')).click();
			srv[4].element(by.partialLinkText('Gmail')).click();
			srv[5].element(by.partialLinkText('Google Drive')).click();
			srv[6].element(by.partialLinkText('Dropbox')).click();
			srv[7].element(by.partialLinkText('OneDrive')).click();
			srv[0].element(by.partialLinkText('Web Page')).click();
		});*/
}
		
module.exports = new addAssetPage();
