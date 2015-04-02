var loginSFPage = function() {
	
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
	
	this.closeBrowserWnd = function(){
		browser.executeScript('window.close()');
	}
	
	this.validateLoggedInProperly = function(){
		//TODO: add validation here that user's 1st name and family name displays properly,
		//all menu items are visible, URL is correct, etc.
	}		
}
		
module.exports = new loginSFPage();
