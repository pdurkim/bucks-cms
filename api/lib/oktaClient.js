const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-516038.oktapreview.com',
  token: '00dmH6-pHCfVV0uWhm9gpF5YX7OKPOj0AMIHmycaK0'
});

module.exports = client;
