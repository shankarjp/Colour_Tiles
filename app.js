easy = document.querySelector(".easy");
hard = document.querySelector(".hard");
multiplayer = document.querySelector(".multiplayer");
easy.addEventListener("click", function() {
  window.location.href = "easy/index_easy.html";
})
hard.addEventListener("click", function() {
  window.location.href = "hard/index_hard.html";
})
multiplayer.addEventListener("click", function() {
  window.location.href = "multiplayer/index_multi.html"
})
