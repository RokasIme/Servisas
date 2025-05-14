const countDOM = document.querySelectorAll(".like-count");
const heartClickDOM = document.querySelectorAll(".click-heart");

let count = 0;

for (let i = 0; i < heartClickDOM.length; i++) {
  heartClickDOM[i].addEventListener("click", () => {
    count++;
    countDOM[i].innerText = count;
  });
}
