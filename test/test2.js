var untappd = require('../dist');
var config = require('./config.json');

untappd.fetchLatestCheckin(config.username, function (checkin) {
  console.log(checkin);
});
