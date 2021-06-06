easy = document.querySelector(".easy");
hard = document.querySelector(".hard");
multiplayer = document.querySelector(".multiplayer");
easy.addEventListener("click", function() {
  window.location.href = "instructions/index_instructions_easy.html";
})
hard.addEventListener("click", function() {
  window.location.href = "instructions/index_instructions_hard.html";
})
multiplayer.addEventListener("click", function() {
  window.location.href = "instructions/index_instructions_multi.html"
})
