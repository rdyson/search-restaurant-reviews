var Xray = require('x-ray');
var x = Xray();

x('https://www.yelp.com/biz/bottega-louie-los-angeles', 'ul.ylist li .review--with-sidebar', [{
  reviewer: '.user-name .user-display-name',
  reviewer_location: '.user-location b',
  review_rating: '.rating-very-large meta[content]@content',
  review_date: '.rating-qualifier [content]@content',
  review_content:'.review-content p'      
}])  
  .paginate('.u-decoration-none.next.pagination-links_anchor@href')
  .write('results2.json')
