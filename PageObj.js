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

	//login into popup window	
	this.loginAsSFUser = function(SFusername, SFpassword){		
		//click login as sf user btn
		this.btnLoginSF.click();
		
		runs(function() {
			var handles = browser.driver.getAllWindowHandles().then(function (handles) {
		    var h2 = handles[1];
		    var h1 = handles[0];
		    
		    expect(h2).toBeDefined();	
			console.log(h1);
			console.log(h2);
			console.log(handles.length);
			
			parenth = h1;
			browser.driver.switchTo().window(h2);
			browser.driver.findElement(By.id('username')).sendKeys(SFusername);
			browser.driver.findElement(By.id('password')).sendKeys(SFpassword);
			browser.driver.findElement(By.id('Login')).click();
			waits(12000);
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
		this.txtUsername.sendKeys(username);
		this.txtPassword.sendKeys(password);
		this.btnLogin.click();
	}
		
}

		
module.exports = new loginKTMPage();
