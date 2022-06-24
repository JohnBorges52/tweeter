$(document).ready(function() {
  
  ///// RESPONSIBLE FOR COUNTING THE NUMBER OF CHARACTERES TYPED ON THE TWEET /////
  const $textarea = $("#tweet-text");

  $textarea.on("keyup", () => {
    const $length = $textarea.val().length;
      if ($length > 140) {
        $(".number-counter").css("color","red")
        $(".number-counter").text(140-($length));
      } else {
        $(".number-counter").text(140-($length));
        $(".number-counter").css("color","#545149");
        
      }

  })


});