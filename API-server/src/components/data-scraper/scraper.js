const { DbItem } = require('./databaseItem/databaseItem');

const cheerio = require('cheerio');

var request = require('request');

var booksRequestUrl = 'https://www.goodreads.com/review/list/52192894?shelf=currently-reading';
var animeRequestUrl = 'https://myanimelist.net/animelist/chrisbentley?status=1';
var gamesRequestUrl = 'https://www.grouvee.com/user/cjbcrazy/shelves/66578-playing/?num=100';

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

function getGames() {
  return getWebsiteHtml(gamesRequestUrl).then( html => {
    var $ = cheerio.load(html);

    const gamesElements = $('#sorted-table .table tbody').children();

    var games = [];

    for(var i=0; i < gamesElements.length; i++) {
      $ = cheerio.load(gamesElements[i]);

      var gameItem = new DbItem('game');

      var gameDetails = [];
      $('td').each(function(i, elem) {
        gameDetails[i] = $(this);
      });

      var imgUrl = cheerio.load(gameDetails[0].html());
      var title = cheerio.load(gameDetails[1].html());
      var rating = cheerio.load(gameDetails[2].html());
      var avgRating = cheerio.load(gameDetails[4].html());
      var releaseDate = cheerio.load(gameDetails[5].html());
      var dateAdded = cheerio.load(gameDetails[6].html());
      var dateCompleted = cheerio.load(gameDetails[7].html());

      gameItem.imgUrl = 'https' + imgUrl('a img').attr('src');
      gameItem.title = title('.wrapper a').text();

      var extractedRating = rating('div span').attr('title')[0];
      if (extractedRating === ' ') {
        gameItem.myRating = '0';
      } else {
        gameItem.myRating = extractedRating;
      }

      gameItem.avgRating = avgRating.text().trim();
      gameItem.releaseDate = releaseDate.text().trim();
      gameItem.dateAdded = dateAdded.text().trim();
      gameItem.dateCompleted = dateCompleted.text().trim();

      games.push(gameItem);
    }

    return games;
  });
}

var getInterests = [getBooks(), getAnime(), getGames()];

Promise.all(getInterests).then(results => {
  console.log(results);
});
