import request from 'request';
import cheerio from 'cheerio';

export const fetchLatestCheckin = (username, callback) => {
  const profileUrl = `https://untappd.com/user/${username}`;
  request(profileUrl, (error, response, body) => {
    if (error) throw error;

    const $ = cheerio.load(body);

    const checkinUrl = $('.checkin').first().find('.feedback > .bottom > a:contains("Detailed")').attr('href');

    request(`https://untappd.com${checkinUrl}`, (error, response, body) => {
      if (error) throw error;
      const $ = cheerio.load(body);

      const $beerInfo = $('.beer');
      const beerName = $beerInfo.find('p > a').text();
      const beerLink = `http://www.untappd.com${$beerInfo.find('p > a').attr('href')}`;
      const beerBrewery = $beerInfo.find('span > a').text();
      const breweryLink = `http://www.untappd.com${$beerInfo.find('span > a').attr('href')}`;
      const comment = $('p.comment').text();
      const rating = Number($('.rating').attr('class').split(' ')[2].match(/\d+/)) / 100;
      const time = $('p.time').text();
      const imgUrl = $('.checkin > .label > img').attr('src');

      const checkin = {
        name: beerName,
        link: beerLink,
        brewery: beerBrewery,
        breweryLink,
        rating,
        image: imgUrl,
        time
      };

      callback(checkin);
    });

  });
};
