const countDOM = document.querySelectorAll(".like-count");
const heartClickDOM = document.querySelectorAll(".click-heart");

for (let i = 0; i < heartClickDOM.length; i++) {
  heartClickDOM[i].addEventListener("click", (event) => {
    event.preventDefault();

    const masterId = heartClickDOM[i].dataset.push;

    if (heartClickDOM[i].classList.contains("heart-color")) {
      fetch("/api/unlike/" + masterId, {
        method: "POST",
      })
        .then(() => {
          heartClickDOM[i].classList.remove("heart-color");
          countDOM[i].innerText = +countDOM[i].innerText - 1;
        })
        .catch((err) => console.log(err));
    } else {
      fetch("/api/like/" + masterId, {
        method: "POST",
      })
        .then(() => {
          heartClickDOM[i].classList.add("heart-color");
          countDOM[i].innerText = +countDOM[i].innerText + 1;
        })
        .catch((err) => console.log(err));
    }
  });
}
