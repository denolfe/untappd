'use strict';

var request = require('request');
var cheerio = require('cheerio');

var fetchTopVenues = function (username, callback) {
  fetchVenues(username, '/venues?type=&sort=highest_checkin', function (venues) {
    callback(venues);
  });
};

var fetchRecentVenues = function (username, callback) {
  fetchVenues(username, '/venues?type=&sort=date_desc', function (venues) {
    console.log(venues);
    callback(venues);
  });
};

var fetchVenues = function (username, sort, callback) {
  var profileUrl = 'https://untappd.com/user/' + username;
  request(profileUrl + sort, function (error, response, body) {
    if (error) throw error;

    var $ = cheerio.load(body);

    var venueList = [];

    $('.venue-item').each(function (rank, item) {
      var $venue = $(item);

      var name = $venue.find('a[data-href=":view/name"]').text().trim();
      var category = $venue.find('.category').text().trim().replace(/(\s|\t){2,}/g, ' ');
      var address = $venue.find('.address').text().trim();
      var firstVisit = $venue.find('.details > .date > a[data-href=":firstVisit"]').text().trim();
      var lastVisit = $venue.find('.details > .date > a[data-href=":lastVisit"]').text().trim();
      if (firstVisit === '') firstVisit = lastVisit;
      var checkins = Number($venue.find('.details > .check-ins').text().match(/\d+/)[0]);

      venueList.push(new venue(rank + 1, name, category, address, firstVisit, lastVisit, checkins));

    });

    callback(venueList);
  });
};

var venue = function (rank, name, category, address, firstVisit, lastVisit, checkins) {
  this.rank = rank;
  this.name = name;
  this.category = category;
  this.address = address;
  this.firstVisit = firstVisit;
  this.lastVisit = lastVisit;
  this.checkins = checkins;
}

module.exports = {
  fetchTopVenues: fetchTopVenues,
  fetchRecentVenues: fetchRecentVenues
};