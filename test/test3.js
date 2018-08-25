var untappd = require('../dist');
var config = require('./config.json');

untappd.fetchHighestRatedBeers(config.username, function (beers) {
  console.log(beers);
});
