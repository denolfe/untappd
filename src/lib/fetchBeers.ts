import request from 'request';
import cheerio from 'cheerio';
import { Beer } from '../models/Beer';

export const fetchRecentBeers = (username, callback) => {
  fetchBeers(username, '/beers?filter_type=type&filter_id=all&sort=', beers => {
    callback(beers);
  });
};

export const fetchMostFrequentBeers = (username, callback) => {
  fetchBeers(username, '/beers?filter_type=type&filter_id=all&sort=checkin', beers => {
    callback(beers);
  });
};

export const fetchHighestRatedBeers = (username, callback) => {
  fetchBeers(username, '/beers?filter_type=type&filter_id=all&sort=highest_rated_you', beers => {
    callback(beers);
  });
};

var fetchBeers = (username, sort, callback) => {
  const profileUrl = `https://untappd.com/user/${username}`;
  request(profileUrl + sort, (error, response, body) => {
    if (error) throw error;

    const $ = cheerio.load(body);

    const recentBeers = [];
    $('.beer-item').each((order, thisBeer) => {
      const $beer = $(thisBeer);
      const beerName = $beer.find('.name').text();
      const beerBrewery = $beer.find('.brewery').text();
      const beerStyle = $beer.find('.style').text();
      const beerAbv = Number($beer.find('.abv').text().trim().match(/^[0-9.]+/g)[0]);
      const beerIbuUnformatted = $beer.find('.ibu').text().trim();
      const beerIbu = beerIbuUnformatted === null ? 0 : Number(beerIbuUnformatted.match(/\d+/));
      const beerDateFirst = $beer.find('.date > a[data-href=":firstCheckin"] > abbr').text();
      const beerDateRecent = $beer.find('.date > a[data-href=":recentCheckin"] > abbr').text();
      const beerCheckins = Number($beer.find('.check-ins').text().match(/\d+/)[0]) || 0;
      const beerRating = Number($beer.find('.ratings > .you > p').text().match(/\d?\.?\d+/));
      // Can't chain the below for some reason. Might be a cheerio oddity
      const prelimGlobalRating = $beer.find('.ratings > .you > p')[1];
      const ratingArray = $(prelimGlobalRating).text().match(/\d+?\.?\d+/);
      const beerGlobalRating = (ratingArray == null) ? 0.00 : Number(ratingArray[0]);

      recentBeers.push(new Beer(order + 1,
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
