const formDOM = document.forms[0];
const nameDOM = document.getElementById("name");
const cityDOM = document.getElementById("city");
const adressDOM = document.getElementById("adress");

if (formDOM) {
  formDOM.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      name: nameDOM.value,
      city: cityDOM.value,
      adress: adressDOM.value,
    };

    fetch(formDOM.action, {
      method: formDOM.dataset.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === "success") {
          location.href = "/admin/workshops";
        }
      })
      .catch((err) => console.log(err));
  });
}
