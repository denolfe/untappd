var untappd = require('../index.js');
var config = require('./config.json');

untappd.fetchMostFrequentBeers(config.username, function (beers) {
  console.log(beers);
});
