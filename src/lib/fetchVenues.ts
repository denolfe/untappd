import request from 'request';
import cheerio from 'cheerio';
import { Venue } from '../models/Venue';

export const fetchTopVenues = (username, callback) => {
  fetchVenues(username, '/venues?type=&sort=highest_checkin', venues => {
    callback(venues);
  });
};

export const fetchRecentVenues = (username, callback) => {
  fetchVenues(username, '/venues?type=&sort=date_desc', venues => {
    console.log(venues);
    callback(venues);
  });
};

var fetchVenues = (username, sort, callback) => {
  const profileUrl = `https://untappd.com/user/${username}`;
  request(profileUrl + sort, (error, response, body) => {
    if (error) throw error;

    const $ = cheerio.load(body);

    const venueList = [];

    $('.venue-item').each((rank, item) => {
      const $venue = $(item);

      const name = $venue.find('a[data-href=":view/name"]').text().trim();
      const category = $venue.find('.category').text().trim().replace(/(\s|\t){2,}/g, ' ');
      const address = $venue.find('.address').text().trim();
      let firstVisit = $venue.find('.details > .date > a[data-href=":firstVisit"]').text().trim();
      const lastVisit = $venue.find('.details > .date > a[data-href=":lastVisit"]').text().trim();
      if (firstVisit === '') firstVisit = lastVisit;
      const checkins = Number($venue.find('.details > .check-ins').text().match(/\d+/)[0]);

      venueList.push(new Venue(rank + 1, name, category, address, firstVisit, lastVisit, checkins));

    });

    callback(venueList);
  });
};



// var venue = function (rank, name, category, address, firstVisit, lastVisit, checkins) {
//   this.rank = rank;
//   this.name = name;
//   this.category = category;
//   this.address = address;
//   this.firstVisit = firstVisit;
//   this.lastVisit = lastVisit;
//   this.checkins = checkins;
// };
