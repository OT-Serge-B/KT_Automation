exports.config  = {
    //
    allScriptsTimeout: 60000,
    getPageTimeout: 15000,
    //running selenium server address
    seleniumAddress: 'http://localhost:4444/wd/hub',

    //capabilities: browsers
    capabilities: {
    'browserName': 'chrome'
    },

    //list our tests here here
    specs: [/*'SalesForce/kt4sf.spec1.js',*/ 
    	'KT/ktm.spec5.js'
    	//, 'KT/ktm.spec3.js'
    	//, 'KT/ktm.spec4.js'
    	//, 'KT/ktm.spec1.js'
    	],
    //options
    jasmineNodeOpts: {
        showcolors: true,
        defaultTimeoutInterval: 60000
    }
};
