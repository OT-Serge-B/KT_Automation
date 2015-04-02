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
	
	//message
	this.globalMessage = element(by.id('globalMessage'));
	
	//assets
	this.btnAddAsset = element(by.partialLinkText('Add'));
	this.listAssets = element(by.css('[class="asset-list-group"]'));
	this.btnInternal = element(by.buttonText('Internal'));
	this.btnRemoveInternal = element(by.css('[data-kt-name="unmark-internal-btn"]'));
	this.btnTags = element(by.buttonText('Tags'));
	this.btnRemoveTags = element(by.css('[data-kt-name="remove-tags-btn"]'));
	

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
		this.btnInternal.click()
			//finally - confirm that asset is Internal not in popup
			.then(function(){
				element(by.partialButtonText('Mark as Internal')).click();
			});	
		//unmark asset from the list
		this.selectAssetInListByTitle(title);	
	}
	
	//to mark asset in the list as not Internal
	this.unmarkAssetInListAsInternalByTitle = function(title){
		//go to assets list
		this.menuAssets.click();
		//select asset from the list
		this.selectAssetInListByTitle(title);
		//click Remove Internal button above the list
		this.btnRemoveInternal.click()
			//finally - confirm removing Internal in popup
			.then(function(){
				element(by.partialButtonText('Remove')).click();
			});	
		//unmark asset from the list
		this.selectAssetInListByTitle(title);	
	}
	
	this.addTagToAssetInListByTitle = function(title, tag){
		//go to assets list
		this.menuAssets.click();
		//select asset from the list
		this.selectAssetInListByTitle(title);
		//click Tag button above the list
		this.btnTags.click()
			.then(function(){
				//enter tag name
				element(by.css('[data-kt-name="add-tags-input-div"]')).element(by.css('[type="text"]')).sendKeys(tag);
			})
				//finally - pick up new tag from dropdown and confirm creation new tag in popup
				.then(function(){
					element(by.css('.selectize-dropdown-content strong')).click();
				})
					.then(function(){
						element(by.partialButtonText('Update')).click();
					});	
		//unmark asset from the list
		this.selectAssetInListByTitle(title);	
	}

	
	this.removeTagFromAssetInListByTitle = function(title, tag){
		//go to assets list
		this.menuAssets.click();
		//select asset from the list
		this.selectAssetInListByTitle(title);
		//click Tag button above the list
		this.btnRemoveTags.click()
			//enter tag name and confirm removing tag in popup
			.then(function(){
				element(by.css('[data-kt-name="remove-tags-input-div"]')).element(by.css('[type="text"]')).sendKeys(tag);
			})
				//finally - pick up tag from dropdown and confirm removing tag in popup
				.then(function(){
					element(by.css('.selectize-dropdown-content span')).click();
				})
					.then(function(){
						element(by.partialButtonText('Update')).click();
					});			//unmark asset from the list
		this.selectAssetInListByTitle(title);	
	}
	
	this.addNewAsset = function() {
		//click Assets->Add
		this.menuAssets.click();
		this.btnAddAsset.click();
		browser.waitForAngular();
		}
	
	this.validateAssetExists = function(title, expected){
		//go to assets list
		this.menuAssets.click();
		//validate that asset with specified title exisis
		expect(element(by.linkText(title)).isPresent()).toBe(expected);
	}
	
	this.validateTagAdded = function(title){
		//validate that message appears
		this.globalMessage.element(by.css('.alert.alert-dismissable.ng-scope.alert-success span')).getText()
			.then(function(messageText){
				expect(messageText).toContain("Successfully added tags for "+title);
			});
	}
	
	this.validateTagRemoved = function(title){
		//validate that message appears
		this.globalMessage.element(by.css('.alert.alert-dismissable.ng-scope.alert-success span')).getText()
			.then(function(messageText){
				expect(messageText).toContain("Successfully removed tags from " + title);
			});
	}
	
	this.validateAssetIsInternal = function(title, expected){
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
					expect(elem[0].element(by.css('[data-kt-name="asset-is-internal"]')).isPresent()).toBe(expected);
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
