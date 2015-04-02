var loginKTMPage = function() {
	var handlesDone = false;
	
	//login controls to be worked with
	this.btnLoginSF = element(by.id('oAuthBtn'));
	this.btnLoginUsername = element(by.id('showLoginBtn'));
	this.txtUsername = element(by.id('loginUsername'));
	this.txtPassword = element(by.id('loginPassword'));
	this.btnLogin = element(by.id('loginBtn'));
	
	//main menu items
	this.menuAssets = element(by.linkText('Assets'));
	
	//assets
	this.btnAddAsset = element(by.partialLinkText('Add'));
	this.listAssets = element(by.css('[class="asset-list-group"]'));

	this.drdwUserName = element(by.css('body > div.top-wrapper > div > div > div.navbar.navbar-default.ng-scope > ul.nav.navbar-nav.navbar-right.navbar-user-menu > li > a > span.navbar-username.ng-binding'));
	this.parentWndHdlr = null;
	
	//to remove asset from assets list on curate page
	this.deleteAssetFromAssetsList = function(title){
		//go to assets list
		this.menuAssets.click();
		var flag = false
		//search title in the list of assets
		element.all(by.repeater('asset in filteredAssets'))
			//filter it as a row in the list
			.filter(function(row){
				//return element
				return row.element(by.css('[class="content-name"]')).getText()
					//whose title appears
					.then(function(txt){
						return txt === title;
					});
				
			})
				//then click checkbox to select that asset
				.then(function(elem){
					elem[0].element(by.css('[class="control-indicator"]')).click();
				})
					//and click trash bin icon above the list of assets
					.then(function(){
						element(by.css('[data-kt-name="remove-assets-btn"]')).click();
					})
						//finally - confirm removing asset in popup
						.then(function(){
							element(by.partialButtonText('Remove')).click();
						});
		
	}
	
	//to select asset from assets list on curate page
	this.selectAssetInListByTitle = function(title){
		//go to assets list
		this.menuAssets.click();
		//search title in the list of assets
		element.all(by.repeater('asset in filteredAssets'))
			.filter(function(row){
				return row.element(by.css('[class="content-name"]')).getText()
					.then(function(txt){
						return txt === title;
					});
				
			})
				.then(function(elem){
					elem[0].element(by.css('[class="control-indicator"]')).click();
				});
		
	}
	
	//to mark asset in the list as Internal
	this.markAssetInListAsInternalByTitle = function(title){
		//go to assets list
		this.menuAssets.click();
		//select asset from the list
		this.selectAssetInListByTitle(title);
		//click Internal button above the list
		element(by.buttonText('Internal')).click()
			//finally - confirm removing asset in popup
			.then(function(){
				element(by.partialButtonText('Mark as Internal')).click();
			});	
		//unmark asset from the list
		this.selectAssetInListByTitle(title);	
	}
	
	
	/*this.clickAssetInListByTitle = function(title){
		//go to assets list
		this.menuAssets.click();
		var flag = false;
		//search title in the list of assets
		element.all(by.repeater('asset in filteredAssets'))
			.filter(function(row){
				return row.element(by.css('[class="content-name"]')).getText()
					.then(function(txt){
						return txt === title;
					});
				
			})
				.then(function(elem){
					elem[0].element(by.css('[class="control-indicator"]')).click();
				})
					.then(function(){
						element(by.css('[data-kt-name="remove-assets-btn"]')).click();
					})
						.then(function(){
							element(by.partialButtonText('Remove')).click();
						});
		
	}*/
	
	
	
	this.addNewAsset = function() {
		//click Assets->Add
		this.menuAssets.click();
		this.btnAddAsset.click();
		browser.waitForAngular();
		}
	
	this.validateAssetExists = function(title){
		//go to assets list
		this.menuAssets.click();
		//validate that asset with specified title exisis
		expect(element(by.linkText(title)).isPresent()).toBe(true);
	}
	
	this.validateAssetNotExist = function(title){
		//go to assets list
		this.menuAssets.click();
		//validate that asset with specified title exisis
		expect(element(by.linkText(title)).isPresent()).toBe(false);
	}
	
	this.validateAssetIsInternal = function(title){
		//go to assets list
		this.menuAssets.click();
		//search title in the list of assets
		element.all(by.repeater('asset in filteredAssets'))
			.filter(function(row){
				return row.element(by.css('[class="content-name"]')).getText()
					.then(function(txt){
						return txt === title;
					});
				
			})
				.then(function(elem){
					expect(elem[0].element(by.css('[data-kt-name="asset-is-internal"]')).isPresent()).toBe(true);
				});
	}
	
	
	
	
	this.getLandingPage = function() {
		browser.get("https://manager-stable.knowledgetree.com");
		//TODO - replace with proper waitforpagetoload
		waits(12000);
	}
	
	//login into popup window	
	this.loginAsSFUser = function(SFusername, SFpassword){		
		var parenth, childh;
		
		//click login as sf user btn
		this.btnLoginSF.click();
		browser.debugger();
		runs(function() {
			//getting handles of all browser windows
			var handles = browser.driver.getAllWindowHandles().then(function (handles) {
		    //to be ure that authentication window has defined handle
		    
		    parenth = handles[0];
		    childh = handles[1];
		    this.parentWndHdlr = handles[0]
		    //expect(parenth).toBeDefined();	    
		    //expect(childh).toBeDefined();
			//switch to authentication window, fill username and password, click login
			browser.driver.switchTo().window(childh);
			waits(8000);
			browser.driver.findElement(By.id('username')).sendKeys(SFusername);
			browser.driver.findElement(By.id('password')).sendKeys(SFpassword);
			browser.driver.findElement(By.id('Login')).click();
			//get back to parent wnd
			browser.driver.switchTo().window(parenth);
			browser.driver.executeScript('window.focus();');
			return handlesDone = true;
			});
		});
	
		waitsFor(function(){
			return handlesDone;
			//browser.driver.switchTo().window(parenth);
			});
	}
		
	this.loginWithUsername = function(username, password){		
		//click login as sf user btn
		this.btnLoginUsername.click();
		//fill username and password, click login
		this.txtUsername.sendKeys(username);
		this.txtPassword.sendKeys(password);
		this.btnLogin.click();
	}
	
	this.validateLoggedInProperly = function(username){
		//TODO: add validation here that username displays properly,
		//all menu items are visible, URL is correct, etc.
		expect(this.drdwUserName.getText()).toEqual(username);
	}
	
	this.ktLogOut = function(){
		//find and click our username dropdown placed in upper right corner (find by css 
		//and not by username to make it usable without available username)
		browser.waitForAngular();
		this.drdwUserName.click();
		//get logout item and click that
		var logout = element(by.css('[ng-click="logout($event)"]'));
		logout.click();
	}		
}
		
module.exports = new loginKTMPage();
