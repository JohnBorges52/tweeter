/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  $("#btn-to-tweet").click(function () {
    $("#tweet-text").focus();
  });

  const loadTweets = function () {
    $.get("http://localhost:8080/tweets").then((data) => {
      renderTweets(data);
    });
  };
  loadTweets();

  $(`#new-tweet-form`).on("submit", (event) => {
    event.preventDefault();

    const serialized = $(`#new-tweet-form`).serialize();
    const length = $(`#tweet-text`).val().length;
    if (length > 140) {
      $(".error-message").css("display", "flex");
    } else if (length === 0) {
      alert("You need to type something...");
    } else {
      $(".error-message").css("display", "none");
      $.post("/tweets", serialized);
      loadTweets();
      $("#tweet-text").val("");
      $("#tweet-text").focus();
    }
  });

  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (let item of tweets) {
      const $user = createTweetElement(item);
      $("#tweets-container").append($user);
    }
  };

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

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
});
