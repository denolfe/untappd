const untappd = require('../dist');
const config = require('./config.json');

untappd.fetchUserStats(config.username, function (stats) {
  console.log(stats);
});
