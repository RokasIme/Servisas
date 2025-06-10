const mastersDOM = document.getElementById("masters");
const formDOM = document.forms[0];
const textInputDOM = formDOM.elements[0];
const categorySelectDOM = formDOM.elements[1];
const mastersSelectDOM = formDOM.elements[2];
const workshopsSelectDOM = formDOM.elements[3];
const thumbnailDOM = formDOM.elements[4];

let timer = null;

function renderCards(data) {
  let HTML = "";

  for (const master of data) {
    const img = master.img ? `/img/${master.img}` : "/img/default.webp";

    HTML += `
            <div class="col">
        <div class="card shadow-sm">
          <div class="photo">
            <img class="bd-placeholder-img card-img-top" src="/img/${
              master.img
            }" alt="Photo" />
            <div data-count="${master.id}" class="like-count">${
      master.totalLikes === null ? 0 : master.totalLikes
    }</div>
            <i data-push="${master.id}" class=" ${
      +master.userLikes === 1 ? "heart-color" : ""
    } click-heart fa fa-heart" aria-hidden="true"></i>
          </div>
          <div class="card-body">
            <h4 class="card-text">${master.name} ${master.lastName}</h4>
            <p class="card-text">Category: ${master.category}</p>
            <p class="card-text">Workshop: ${master.workshop}, ${
      master.city
    }</p>
            <p class="card-text">Experience: ${master.experience}</p>

            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a href="/masters/${
                  master.url_slug
                }" class="btn btn-sm btn-outline-secondary">
                  View all ${master.category}'s
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  mastersDOM.innerHTML = HTML;

  const count2DOM = document.querySelectorAll(".like-count");
  const heartClick2DOM = document.querySelectorAll(".click-heart");

  for (let i = 0; i < heartClick2DOM.length; i++) {
    heartClick2DOM[i].addEventListener("click", (event) => {
      event.preventDefault();

      const masterId = heartClick2DOM[i].dataset.push;

      if (heartClick2DOM[i].classList.contains("heart-color")) {
        fetch("/api/unlike/" + masterId, {
          method: "POST",
        })
          .then(() => {
            heartClick2DOM[i].classList.remove("heart-color");
            count2DOM[i].innerText = +count2DOM[i].innerText - 1;
          })
          .catch((err) => console.log(err));
      } else {
        fetch("/api/like/" + masterId, {
          method: "POST",
        })
          .then(() => {
            heartClick2DOM[i].classList.add("heart-color");
            count2DOM[i].innerText = +count2DOM[i].innerText + 1;
          })
          .catch((err) => console.log(err));
      }
    });
  }
}

function getData() {
  clearTimeout(timer);

  timer = setTimeout(() => {
    const data = {};

    if (textInputDOM.value.trim()) {
      data.text = textInputDOM.value.trim();
    }
    if (categorySelectDOM.value !== "0") {
      data.category = categorySelectDOM.value;
    }
    if (mastersSelectDOM.value !== "0") {
      data.master = mastersSelectDOM.value;
    }
    if (workshopsSelectDOM.value !== "0") {
      data.workshop = workshopsSelectDOM.value;
    }
    if (thumbnailDOM.checked === true) {
      data.img = true;
    }

    fetch("/api/masters?" + new URLSearchParams(data).toString())
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          renderCards(data.content);
        }
      })
      .catch(console.error);
  }, 300);
}

textInputDOM.addEventListener("keyup", getData);
categorySelectDOM.addEventListener("change", getData);
mastersSelectDOM.addEventListener("change", getData);
workshopsSelectDOM.addEventListener("change", getData);
thumbnailDOM.addEventListener("change", getData);
