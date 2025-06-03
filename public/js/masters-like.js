const countDOM = document.querySelectorAll(".like-count");
const heartClickDOM = document.querySelectorAll(".click-heart");

for (let i = 0; i < heartClickDOM.length; i++) {
  heartClickDOM[i].addEventListener("click", (event) => {
    event.preventDefault();

    const data = {
      likes: 1,
      masterId: heartClickDOM[i].dataset.push,
    };

    fetch("/api/likes/" + heartClickDOM[i].dataset.push, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        heartClickDOM[i].style.color = "red";
        countDOM[i].innerText = +countDOM[i].innerText + 1;
      })
      .catch((err) => console.log(err));
  });
}
