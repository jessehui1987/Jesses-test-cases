exports.config = {
  runner: 'local',
  specs: [
    './test/specs/**/*.spec.js'
  ],
  exclude: [],
  maxInstances: 1,
  capabilities: [{
    browserName: 'chrome'
  }],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'http://localhost',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  }
}
