/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  ///// RESPONSIBLE FOR FOCUS THE INFORMATION ON THE TEXTAREA AND LOAD NEW TWEETS ON THE PAGE ///////

  $("#btn-to-tweet").click(function () {
    $("#tweet-text").focus();
  });

  const loadTweets = function () {
    $.get("/tweets").then((data) => {
      renderTweets(data);
    });
  };
  loadTweets();
  /////////  RESPONSIBLE FOR SUBMITTING BUTTON AND ERROR HANDLING ////

  $(`#new-tweet-form`).on("submit", (event) => {
    event.preventDefault();

    const serialized = $(`#new-tweet-form`).serialize();
    const length = $(`#tweet-text`).val().length;

    if (length > 140) {
      $(".error-message").css("display", "flex");
      $(".error-message-empty").css("display", "none");
    } else if (length === 0) {
      $(".error-message-empty").css("display", "flex");
      $(".error-message").css("display", "none");
    } else {
      $(".error-message").css("display", "none");
      $(".error-message-empty").css("display", "none");

      $.post("/tweets", serialized).then((data) => {
        loadTweets(data);
      });

      $("#tweet-text").val("");
      $("#tweet-text").focus();
      $(".number-counter").val("140");
    }
  });

  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (let item of tweets) {
      const $user = createTweetElement(item);
      $("#tweets-container").append($user);
    }
  };

  //// CREATE EACH SINGLE TWEET AND APPLY USERS INFORMATION /////
  const createTweetElement = function (obj) {
    const safeHTML = `<p>${escape(obj.content.text)}</p>`;

    const $tweet = $(`<article class="tweets-article" id="tweets-container">
  <div class="icon-name-hashtag">
    <div class="icon-name">
      <img class="avatar-pic" src="${obj.user.avatars}" />

      <p>${obj.user.name}</p>
    </div>
    <p class="person-hashtag">${obj.user.handle}</p>
  </div>
  <div class="div-past-tweet-message">${safeHTML}
  </div>
  <footer class="div-bellow-tweet-message">
    <span>${timeago.format(obj.created_at)}</span>
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
  </footer>
</article>`);

    return $tweet;
  };
  ////// MAKE ESCAPE WORDS IN ORDER TO NOT ACTIVATE SCRIPTS BY USERS //////
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
});
