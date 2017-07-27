const { DbItem } = require('./databaseItem/databaseItem');

const cheerio = require('cheerio');

var request = require('request');

var booksRequestUrl = 'https://www.goodreads.com/review/list/52192894?shelf=currently-reading';
var animeRequestUrl = 'https://myanimelist.net/animelist/chrisbentley?status=1';

function getWebsiteHtml(requestUrl) {
  return new Promise((resolve, reject) => {
    request(requestUrl, (error, response, html) => {
      if (error || response.statusCode != 200) {
        reject(error);
      }
      resolve(html);
    });
  });
}

function getBooks() {
  return getWebsiteHtml(booksRequestUrl).then( html => {

    var $ = cheerio.load(html);

    const booksElements = $('#booksBody').children();

    var books = [];

    for(var i=0; i < booksElements.length; i++) {
      $ = cheerio.load(booksElements[i]);

      var bookItem = new DbItem('book');

      bookItem.title = $('.title .value').text().trim();

      var smallImgUrl = $('.cover .value div div a img').attr('src').split('s/');
      bookItem.imgUrl = smallImgUrl[0] + 's/' + smallImgUrl[1] + 'l/' + smallImgUrl[2];

      var author = $('.author .value a').text().trim().split(', ');
      bookItem.author = author[1] + ' ' + author[0];

      bookItem.avgRating = $('.avg_rating .value').text().trim();

      bookItem.myRating = $('.shelves .value .stars').attr('data-rating');

      bookItem.dateAdded = $('.date_added .value span').text().trim();

      bookItem.dateCompleted = $('.date_read .value span').text().trim();

      books.push(bookItem);
    }

    return books;
  });
}

function getAnime() {
  return getWebsiteHtml(animeRequestUrl).then( html => {
    var $ = cheerio.load(html);

    const animeData = JSON.parse($('.list-unit.watching table').attr('data-items'));

    var anime = [];

    for(var i=0; i < animeData.length; i++) {
      item = animeData[i];

      var animeItem = new DbItem('anime');

      animeItem.title = item.anime_title;
      animeItem.imgUrl = item.anime_image_path;
      animeItem.mediaType = item.anime_media_type_string;
      animeItem.myRating = item.score;
      animeItem.progress = item.num_watched_episodes + ' / ' + item.anime_num_episodes;

      anime.push(animeItem);
    }

    return anime;
  });
}


var getInterests = [getBooks(), getAnime()];

Promise.all(getInterests).then(results => {
  console.log(results);
});
