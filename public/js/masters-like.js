const countDOM = document.querySelectorAll(".like-count");
const heartClickDOM = document.querySelectorAll(".click-heart");

for (let i = 0; i < heartClickDOM.length; i++) {
  heartClickDOM[i].addEventListener("click", (event) => {
    event.preventDefault();

    const data = {
      masterId: heartClickDOM[i].dataset.push,
    };

    if (heartClickDOM[i].classList.contains("heart-color")) {
      fetch("/api/unlike/" + data.masterId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((data) => data.json())
        .then((data) => {
          heartClickDOM[i].classList.toggle("heart-color");
          countDOM[i].innerText = +countDOM[i].innerText - 1;
          console.log(data);
        })
        .catch((err) => console.log(err));
    } else {
      fetch("/api/like/" + data.masterId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((data) => data.json())
        .then((data) => {
          heartClickDOM[i].classList.toggle("heart-color");
          countDOM[i].innerText = +countDOM[i].innerText + 1;
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  });
}
