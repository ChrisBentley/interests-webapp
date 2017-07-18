const cheerio = require('cheerio');

var request = require('request');

var requestUrl = 'https://www.goodreads.com/review/list/52192894?shelf=currently-reading';

request(requestUrl, function(error, response, html) {
  if (!error && response.statusCode == 200){

    var $ = cheerio.load(html);

    const booksElements = $('#booksBody').children();

    var books = [];

    for(var i=0; i < booksElements.length; i++) {
      $ = cheerio.load(booksElements[i]);
      var bookDetails = {};

      bookDetails.title = $('.title .value').text().trim();

      var smallImgUrl = $('.cover .value div div a img').attr('src').split('s/');
      bookDetails.imgUrl = smallImgUrl[0] + 's/' + smallImgUrl[1] + 'l/' + smallImgUrl[2];

      var author = $('.author .value a').text().trim().split(', ');
      bookDetails.author = author[1] + ' ' + author[0];

      bookDetails.avgRating = $('.avg_rating .value').text().trim();

      bookDetails.myRating = $('.shelves .value .stars').attr('data-rating');

      bookDetails.dateAdded = $('.date_added .value span').text().trim();

      bookDetails.dateCompleted = $('.date_read .value span').text().trim();

      books.push(bookDetails);
    }

    console.log(books);
  }
});
