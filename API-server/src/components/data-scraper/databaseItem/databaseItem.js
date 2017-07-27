class DbItem {
  constructor(type){
    this.type = type;

    this.title = null;
    this.imgUrl = null;
    this.avgRating = null;
    this.myRating = null;
    this.dateAdded = null;
    this.dateCompleted = null;
    this.releaseDate = null;
    this.director = null;
    this.author = null;
    this.platform = null;
    this.ratingScale = null;
    this.progress = null;
    this.mediaType = null;

    if ( this.type === 'book' || this.type === 'game') {
      this.ratingScale = 5;
    } else {
      this.ratingScale = 10;
    }
  }
}

exports.DbItem = DbItem;
