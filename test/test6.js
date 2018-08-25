var untappd = require('../dist');
var config = require('./config.json');

untappd.fetchMostFrequentBeers(config.username, function (beers) {
  console.log(beers);
});
