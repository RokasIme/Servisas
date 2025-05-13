import { categoriesData } from "../data/categories.js";

export function categoriesList() {
  let HTML = "";
  const data = [...categoriesData];

  for (const item of data) {
    HTML += `
    <div class="col d-flex align-items-start">
      <div>
        <h3 class="fs-2 text-body-emphasis">${item.category}</h3>
        <p>${item.description}
        </p>
        <a href="/masters/${item.slug}" class="btn btn-primary"> View category </a>
      </div>
    </div>
        `;
  }
  return HTML;
}
