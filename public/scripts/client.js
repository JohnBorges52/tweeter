/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


const renderTweets = function (tweets){
  for (let item of tweets) {
    const $user = createTweetElement(item)
    $('#tweets-container').append($user)
  }
}


const createTweetElement = function(obj) {

  const $tweet = 
  $(`<article class="tweets-article" id="tweets-container">
  <div class="icon-name-hashtag">
    <div class="icon-name">
      <img class="old-guy-pic" src="${obj.user.avatars}" />

      <p>${obj.user.name}</p>
    </div>
    <p class="person-hashtag">${obj.user.handle}</p>
  </div>
  <div class="div-past-tweet-message">
    ${obj.content.text}
  </div>
  <div class="div-bellow-tweet-message">
    <span>${obj.created_at}</span>
    <div>
      <a class="icon-link-hover" href="#">
        <i class="fa-solid fa-flag"></i
      ></a>
      <a class="icon-link-hover" href="#">
        <i class="fa-solid fa-retweet"></i
      ></a>
      <a class="icon-link-hover" href="#">
        <i class="fa-solid fa-heart"></i
      ></a>
    </div>
  </div>
</article>`);


return $tweet

}

renderTweets(data)





















});

