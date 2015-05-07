var untappd = require('../index.js');
var config = require('./config.json');

untappd.fetchUserStats(config.username, function (stats) {
  console.log(stats);
});
