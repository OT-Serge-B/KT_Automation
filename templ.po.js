var loginKTMPage = function() {
	var handlesDone = false;
	var parenth, childh;
	
	//login button to be clicked
	this.btnLoginSF = element(by.id('oAuthBtn'));
	this.btnLoginUsername = element(by.id('showLoginBtn'));
	this.txtUsername = element(by.id('loginUsername'));
	this.txtPassword = element(by.id('loginPassword'));
	this.btnLogin = element(by.id('loginBtn'));
	
	//get start page
	this.getLandingPage = function() {
		browser.get("https://manager-stable.knowledgetree.com");
		//TODO - replace with proper waitforpagetoload
		waits(12000);
	}
	
	this.getSFLandingPage = function() {
		browser.driver.get("https://login.salesforce.com");
		//TODO - replace with proper waitforpagetoload
		waits(12000);
	}
	
	this.SFlogin = function(username, password) {
		//fill username and password, click login
		browser.driver.findElement(by.id('username')).sendKeys(username);
		browser.driver.findElement(by.id('password')).sendKeys(password);
		browser.driver.findElement(by.id('Login')).click();
		}

	//login into popup window	
	this.loginAsSFUser = function(SFusername, SFpassword){		
		//click login as sf user btn
		this.btnLoginSF.click();
		
		runs(function() {
			//getting handles of all browser windows
			var handles = browser.driver.getAllWindowHandles().then(function (handles) {
		    //to be ure that authentication window has defined handle
		    var h2 = handles[1];	    
		    expect(h2).toBeDefined();
			//switch to authentication window, fill username and password, click login
			browser.driver.switchTo().window(h2);
			browser.driver.findElement(By.id('username')).sendKeys(SFusername);
			browser.driver.findElement(By.id('password')).sendKeys(SFpassword);
			browser.driver.findElement(By.id('Login')).click();
			return handlesDone = true;
			});
		});
	
		waitsFor(function(){
			return handlesDone;
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
	
	this.closeBrowserWnd = function(){
		browser.executeScript('window.close()');
	}
	
	this.validateLoggedInProperly = function(){
		//TODO: add validation here that user's 1st name and family name displays properly,
		//all menu items are visible, URL is correct, etc.
	}		
}
		
module.exports = new loginKTMPage();
