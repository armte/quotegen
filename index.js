/*Array to store each background picture and corresponding color to set the text and buttons as*/
var schemeCount = 1;

var schemes = [ {'imgSrc': 'https://armte.github.io/img/landscape29.jpg', 'color': '#A87354'}, {'imgSrc': 'https://armte.github.io/img/landscape2.jpg', 'color': '#7E6B6D'}, {'imgSrc': 'https://armte.github.io/img/landscape3.jpg', 'color': '#6D112B'}, {'imgSrc': 'https://armte.github.io/img/landscape4.jpeg', 'color': '#0A9762'}, {'imgSrc': 'https://armte.github.io/img/landscape5.jpg', 'color': '#385C77'}, {'imgSrc': 'https://armte.github.io/img/landscape6.jpg', 'color': '#026489'}, {'imgSrc': 'https://armte.github.io/img/landscape7.jpg', 'color': '#34613C'}, {'imgSrc': 'https://armte.github.io/img/landscape8.jpg', 'color': '#9C7E40'}, {'imgSrc': 'https://armte.github.io/img/landscape9.jpg', 'color': '#717696'}, {'imgSrc': 'https://armte.github.io/img/landscape10.jpg', 'color': '#3E7DA6'}, {'imgSrc': 'https://armte.github.io/img/landscape11.JPG', 'color': '#42870C'}, {'imgSrc': 'https://armte.github.io/img/landscape12.jpg', 'color': '#070205'}, {'imgSrc': 'https://armte.github.io/img/landscape13.jpg', 'color': '#77332E'}, {'imgSrc': 'https://armte.github.io/img/landscape14.jpg', 'color': '#464441'}, {'imgSrc': 'https://armte.github.io/img/landscape15.jpg', 'color': '#934309'}, {'imgSrc': 'https://armte.github.io/img/landscape16.jpg', 'color': '#5E354E'}, {'imgSrc': 'https://armte.github.io/img/landscape17.jpg', 'color': '#462C2D'}, {'imgSrc': 'https://armte.github.io/img/landscape18.jpg', 'color': '#122D30'}, {'imgSrc': 'https://armte.github.io/img/landscape19.jpg', 'color': '#456706'}, {'imgSrc': 'https://armte.github.io/img/landscape20.jpg', 'color': '#079EF1'}, {'imgSrc': 'https://armte.github.io/img/landscape21.jpg', 'color': '#85827D'}, {'imgSrc': 'https://armte.github.io/img/landscape22.jpg', 'color': '#445416'}, {'imgSrc': 'https://armte.github.io/img/landscape23.jpg', 'color': '#4C9812'}, {'imgSrc': 'https://armte.github.io/img/landscape24.jpg', 'color': '#6A90C0'}, {'imgSrc': 'https://armte.github.io/img/landscape25.jpg', 'color': '#61711A'}, {'imgSrc': 'https://armte.github.io/img/landscape26.jpg', 'color': '#213C94'}, {'imgSrc': 'https://armte.github.io/img/landscape27.jpg', 'color': '#110D04'}, {'imgSrc': 'https://armte.github.io/img/landscape28.jpg', 'color': '#040203'}, {'imgSrc': 'https://armte.github.io/img/landscape1.jpg', 'color': '#6C5C5C'}
];
/*fades in and retrieves the quote when the webpage loads*/
$(document).ready(function() {
  $("#quote-box").hide();
    getQuote();
  $("#quote-box").fadeIn(3000);
  $(".button").fadeIn(3000);
});
  
/*Function to connect to the API that generates the quote and to insert it and the author's name into the html. Also calls to the function to update the tweet button so that it tweets the current quote*/
function getQuote() {
  $.ajax({
    url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',

    success: function(data) {
      /*The quote is brought in nested within a <p> element which is formatted to have a line break before and after it. To remove it and keep the quotation marks and quote in-line i used the JQueary function to extract just the text*/
      var quote = data.shift();
      var quoteText = jQuery(quote.content).text();
      $("#random-quote").text(quoteText); 
      $("#author-name").html("- " + quote.title);

      updateTweet(quoteText, quote.title);
    },//end of success
    
    error: function() {
      $("#random-quote").html('An error occurred');
    },//end of error
    cache: false
  });//end of ajax
}//end getQuote();

/*Function that is executed when the new quote button is clicked to generate a new background image, color and quote*/
$("#new-quote-btn").on("click", function (){
  
  var newScheme = schemes.shift();
  schemes.push(newScheme);
  
  var schemeSrc = newScheme.imgSrc;
  var schemeColor = newScheme.color;
  
  $("#quote-box").fadeOut(1000, function () {
    getQuote();
    $("#quote-row").css('color', schemeColor);
    $("#author-name").css('color', schemeColor);
    $(".button").css('background-color', schemeColor);
  }).delay(500).fadeIn(1500);
  
  $(".wallpaper").fadeTo(1000, 0.2, function () {
    $(this).css('background-image', 'url('+schemeSrc+')');
  }).fadeTo(1500, 1);
  
  schemeCount += 1;
  if(schemeCount == schemes.length) {
    schemes = shuffleArray(schemes);
    schemeCount = 1;
    console.log(schemes)
  }
  console.log(schemeCount);
});//end click function

/*This method updates the tweet button so that the href will connect to a twitter page that has the quote and the author already prefilled in the tweet text field*/
function updateTweet(quote, authorInfo) {
  
  var stringAuthor = JSON.stringify(authorInfo);
  var quoteAuthor = stringAuthor.slice(1,-1);
  
  $("#tweet-quote").attr("href", "https://twitter.com/intent/tweet?text=" + quote +  "%0a--- "+ quoteAuthor);  
}//end of updateTweet

/*Function to shuffle scheme order once all the schemes have been viewed in a particular order*/
function shuffleArray(array) {
  var currentIndex = array.length;
  while (currentIndex != 0) {
    var randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    var tempScheme = array[randomIndex];
    array[randomIndex] = array[currentIndex];
    array[currentIndex] = tempScheme;
  }
  return array;
}//End shuffleArray