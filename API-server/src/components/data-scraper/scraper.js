const cheerio = require('cheerio');

var request = require('request');

request('http://www.goodreads.com/review/list/52192894?shelf=currently-reading', function(error, response, html) {
  if (!error && response.statusCode == 200){
    // console.log(html);
    var $ = cheerio.load(html);

    const booksElements = $('#booksBody').children();

    var bookTitles = [];

    for(var i=0; i < booksElements.length; i++) {
      $ = cheerio.load(booksElements[i]);
      bookTitles.push($('.title .value').text().trim());
    }

    console.log(bookTitles);
  }
});
