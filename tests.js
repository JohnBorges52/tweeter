window.addEventListener("DOMContentLoaded", () => {
  const text = document.getElementById("text")

  console.log(text)
  
  text.addEventListener("keydown", (e) => {
    console.log("down", e)
  });



})


