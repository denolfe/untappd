'use strict';

var request = require('request');
var cheerio = require('cheerio');

var fetchUserStats = function (username, callback) {
  var profileUrl = 'https://untappd.com/user/' + username;
  request(profileUrl, function (error, response, body) {
    if (error) throw error;

    var $ = cheerio.load(body);

    var $statsDiv = $('.stats-bar .stats');

    var totalBeers = $statsDiv.find('a[data-href=":stats/general"] > span').first().text();
    var uniqueBeers = $statsDiv.find('a[data-href=":stats/beerhistory"] > span').first().text();
    var badges = $statsDiv.find('a[data-href=":stats/badges"] > span').first().text();
    var friends = $statsDiv.find('a[data-href=":stats/friends"] > span').first().text();

    var stats = {
      total: Number(totalBeers),
      unique: Number(uniqueBeers),
      badges: Number(badges),
      friends: Number(friends),
      username: username
    };
    callback(stats);
  });
};

module.exports = fetchUserStats;