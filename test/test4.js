var untappd = require('../index.js');
var config = require('./config.json');

untappd.fetchTopVenues(config.username, function (venues) {
  console.log(venues);
});
