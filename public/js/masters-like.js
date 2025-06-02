const countDOM = document.querySelectorAll(".like-count");
const heartClickDOM = document.querySelectorAll(".click-heart");

for (let i = 0; i < heartClickDOM.length; i++) {
  heartClickDOM[i].addEventListener("click", (event) => {
    event.preventDefault();
    countDOM[i].innerText++;

    const data = {
      likes: countDOM[i].innerText,
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
      })
      .catch((err) => console.log(err));
  });
}
