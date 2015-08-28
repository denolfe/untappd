'use strict';

var request = require('request');
var cheerio = require('cheerio');

var fetchLatestCheckin = function (username, callback) {
  var profileUrl = 'https://untappd.com/user/' + username;
  request(profileUrl, function (error, response, body) {
    if (error) throw error;

    var $ = cheerio.load(body);

    var checkinUrl = $('.checkin').first().find('.feedback > .bottom > a:contains("Detailed")').attr('href');

    request('https://untappd.com' + checkinUrl, function (error, response, body) {
      if (error) throw error;
      var $ = cheerio.load(body);

      var $beerInfo = $('.beer');
      var beerName = $beerInfo.find('p > a').text();
      var beerLink = "http://www.untappd.com" + $beerInfo.find('p > a').attr('href');
      var beerBrewery = $beerInfo.find('span > a').text();
      var breweryLink = "http://www.untappd.com" + $beerInfo.find('span > a').attr('href');
      var comment = $('p.comment').text();
      var rating = Number($('.rating').attr('class').split(' ')[2].match(/\d+/)) / 100;
      var time = $('p.time').text();
      var imgUrl = $('.checkin > .label > img').attr('src');

      var checkin = {
        name: beerName,
        link: beerLink,
        brewery: beerBrewery,
        breweryLink: breweryLink,
        rating: rating,
        image: imgUrl,
        time: time
      };

      callback(checkin);
    });

  });
};

module.exports = fetchLatestCheckin;