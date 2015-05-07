var untappd = require('../index.js');
var config = require('./config.json');

untappd.fetchHighestRatedBeers(config.username, function (beers) {
  console.log(beers);
});
