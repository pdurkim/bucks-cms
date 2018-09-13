const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-516038.oktapreview.com/',
  token: '0066zEvcnsEM2QpQo8mEeomvvr3Ziu_jtGbbjfEBcM'
});

module.exports = client;
