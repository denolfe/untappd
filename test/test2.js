var untappd = require('../index.js');
var config = require('./config.json');

untappd.fetchLatestCheckin(config.username, function (checkin) {
  console.log(checkin);
});
