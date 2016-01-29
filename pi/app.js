const controller = require('controller');
const fetch = require('isomorphic-fetch');

controller.bindCallback((action) => {
  console.log(action);
});
