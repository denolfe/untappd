import request from 'request';
import cheerio from 'cheerio';
import { User } from '../models/User';

export const fetchUserStats = (username, callback) => {
  const profileUrl = `https://untappd.com/user/${username}`;
  request(profileUrl, (error, response, body) => {
    if (error) throw error;

    const $ = cheerio.load(body);
    const statsDiv = $('span.stat');
    const totalBeers = statsDiv.first().text();
    const uniqueBeers = statsDiv[1].firstChild.data;
    const badges = statsDiv[2].firstChild.data;
    const friends = statsDiv[3].firstChild.data;

    let user = new User(username, Number(totalBeers), Number(uniqueBeers), Number(badges), Number(friends));

    callback(user);
  });
};
