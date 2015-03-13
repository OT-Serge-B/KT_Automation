exports.config  = {
    //
    allScriptsTimeout: 15000,
    getPageTimeout: 15000,
    //running selenium server address
    seleniumAddress: 'http://localhost:4444/wd/hub',

    //capabilities: browsers
    capabilities: {
    'browserName': 'safari'
    },

    //list our tests here here
    specs: ['specification1.js'],
    //options
    jasmineNodeOpts: {
        showcolors: true,
        defaultTimeoutInterval: 15000
    }
};
