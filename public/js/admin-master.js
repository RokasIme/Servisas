const imageFormDOM = document.forms[0];
const uploadDOM = document.getElementById("thumbnail");
const imageDOM = document.getElementById("image");

const contentFormDOM = document.forms[1];
const nameDOM = document.getElementById("name");
const lastNameDOM = document.getElementById("last_name");
const categoryDOM = document.getElementById("category");
const experienceDOM = document.getElementById("experience");
const workshopDOM = document.getElementById("workshop");

if (imageFormDOM) {
  imageFormDOM.querySelector("input").addEventListener("change", (e) => {
    const formData = new FormData();
    formData.append("thumbnail", e.target.files[0]);

    fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          imageDOM.src = data.msg;
        }
      })
      .catch(console.error);
  });
}

if (contentFormDOM) {
  contentFormDOM.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      name: nameDOM.value,
      lastName: lastNameDOM.value,
      status: document.querySelector('[name="status"]:checked').value,
    };
    if (+categoryDOM.value) {
      data.category = +categoryDOM.value;
    }
    if (experienceDOM.value) {
      data.experience = experienceDOM.value;
    }
    if (+workshopDOM.value) {
      data.workshop = +workshopDOM.value;
    }

    const imageURL = new URL(imageDOM.src);

    if (imageURL.pathname !== "/img/default.webp") {
      data.image = imageURL.pathname;
    }

    fetch(contentFormDOM.action, {
      method: contentFormDOM.dataset.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === "success") {
          location.href = "/admin/masters";
        }
      })
      .catch((err) => console.log(err));
  });
}
