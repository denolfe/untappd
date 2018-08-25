var untappd = require('../dist');
var config = require('./config.json');

untappd.fetchRecentBeers(config.username, function (beerList) {
  console.log(beerList);
});
