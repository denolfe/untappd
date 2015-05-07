'use strict';

var fetchUserStats = require('./lib/fetchUserStats.js');
var fetchLatestCheckin = require('./lib/fetchLatestCheckin.js');
var fetchTopVenues = require('./lib/fetchVenues.js').fetchTopVenues;

var fetchRecentBeers = require('./lib/fetchBeers.js').fetchRecentBeers;
var fetchMostFrequentBeers = require('./lib/fetchBeers.js').fetchMostFrequentBeers;
var fetchHighestRatedBeers = require('./lib/fetchBeers.js').fetchHighestRatedBeers;

module.exports = {
  fetchUserStats: fetchUserStats,
  fetchLatestCheckin: fetchLatestCheckin,
  fetchTopVenues: fetchTopVenues,
  fetchRecentBeers: fetchRecentBeers,
  fetchMostFrequentBeers : fetchMostFrequentBeers,
  fetchHighestRatedBeers: fetchHighestRatedBeers
};