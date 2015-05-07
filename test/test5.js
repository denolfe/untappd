var untappd = require('../index.js');
var config = require('./config.json');

untappd.fetchRecentBeers(config.username, function (beerList) {
  console.log(beerList);
});
