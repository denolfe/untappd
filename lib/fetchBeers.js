'use strict';

var request = require('request');
var cheerio = require('cheerio');

var fetchRecentBeers = function (username, callback) {
  fetchBeers(username, '/beers?filter_type=type&filter_id=all&sort=', function (beers) {
    callback(beers);
  });
};

var fetchMostFrequentBeers = function (username, callback) {
  fetchBeers(username, '/beers?filter_type=type&filter_id=all&sort=checkin', function (beers) {
    callback(beers);
  });
};

var fetchHighestRatedBeers = function (username, callback) {
  fetchBeers(username, '/beers?filter_type=type&filter_id=all&sort=highest_rated_you', function (beers) {
    callback(beers);
  });
};

var fetchBeers = function (username, sort, callback) {
  var profileUrl = 'https://untappd.com/user/' + username;
  request(profileUrl + sort, function (error, response, body) {
    if (error) throw error;

    var $ = cheerio.load(body);

    var recentBeers = [];
    $('.beer-item').each(function (order, thisBeer) {
      var $beer = $(thisBeer);
      var beerName = $beer.find('.name').text();
      var beerBrewery = $beer.find('.brewery').text();
      var beerStyle = $beer.find('.style').text();
      var beerAbv = $beer.find('.abv').text().trim();
      var beerIbuUnformatted = $beer.find('.ibu').text().trim();
      var beerIbu = beerIbuUnformatted === null ? 0 : Number(beerIbuUnformatted.match(/\d+/));
      var beerDateFirst = $beer.find('.date > a[data-href=":firstCheckin"] > abbr').text();
      var beerDateRecent = $beer.find('.date > a[data-href=":recentCheckin"] > abbr').text()
      var beerCheckins = Number($beer.find('.check-ins').text().match(/\d+/)[0]);
      var beerRating = Number($beer.find('.ratings > .you > p').text().match(/\d\.\d+/)[0]);
      // Can't chain the below for some reason. Might be a cheerio oddity
      var prelimGlobalRating = $beer.find('.ratings > .you > p')[1];
      var ratingArray = $(prelimGlobalRating).text().match(/\d+\.\d+/);
      var beerGlobalRating = (ratingArray == null) ? 0.00 : Number(ratingArray[0]);

      recentBeers.push(new beer(order + 1,
        beerName,
        beerBrewery,
        beerStyle,
        beerAbv,
        beerIbu,
        beerDateFirst,
        beerDateRecent,
        beerCheckins,
        beerRating,
        beerGlobalRating));
    });

    callback(recentBeers);
  });
};

var beer = function (order, name, brewery, style, abv, ibu, dateFirst, dateRecent, checkins, rating, globalRating) {
  this.order = order;
  this.name = name;
  this.brewery = brewery;
  this.style = style;
  this.abv = abv;
  this.ibu = ibu;
  this.dateFirst = dateFirst;
  this.dateRecent = dateRecent;
  this.checkins = checkins;
  this.rating = rating;
  this.globalRating = globalRating;
}

module.exports = {
  fetchRecentBeers: fetchRecentBeers,
  fetchMostFrequentBeers : fetchMostFrequentBeers,
  fetchHighestRatedBeers: fetchHighestRatedBeers
};