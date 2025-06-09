const formDOM = document.forms[0];
const textInputDOM = formDOM.elements[0];
const categorySelectDOM = formDOM.elements[1];
const mastersSelectDOM = formDOM.elements[2];
const workshopsSelectDOM = formDOM.elements[3];
const thumbnailDOM = formDOM.elements[4];

function getData() {
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
    data.thumbnail = true;
  }

  fetch("/api/masters?" + new URLSearchParams(data).toString())
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        console.log(data.content);
      }
    })
    .catch(console.error);

  return [];
}

textInputDOM.addEventListener("keyup", () => {
  console.log("text:", textInputDOM.value);
  getData();
});

categorySelectDOM.addEventListener("change", () => {
  console.log("category:", categorySelectDOM.value);
  getData();
});

mastersSelectDOM.addEventListener("change", () => {
  console.log("master:", mastersSelectDOM.value);
  getData();
});

workshopsSelectDOM.addEventListener("change", () => {
  console.log("workshop:", workshopsSelectDOM.value);
  getData();
});

thumbnailDOM.addEventListener("change", () => {
  console.log("thumbnail:", thumbnailDOM.checked);
  getData();
});
