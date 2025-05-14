import { mastersData } from "../data/masters.js";
import { PageTemplate } from "../templates/PageTemplate.js";

export class PageMasters extends PageTemplate {
  constructor(req) {
    super(req);
    this.activeMenuIndex = 1;
  }

  masters(category) {
    let html = "";

    for (const master of mastersData) {
      if (master.slug === category || category === "")
        html += `
      <div class="col">
        <div class="card shadow-sm">
          <div class="photo">
            <img class="bd-placeholder-img card-img-top" src="/img/${master.img}" alt="Photo" />
            <div class="like-count">0</div>
            <i class="click-count fa fa-heart" aria-hidden="true"></i>
          </div>
          <div class="card-body">
            <h4 class="card-text">${master.name} ${master.lastName}</h4>
            <p class="card-text">Category: ${master.specialization}</p>
            <p class="card-text">Workshop: ${master.service}, ${master.city}</p>
            <p class="card-text">Experience: ${master.experiece}</p>

            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a href="/masters/${master.slug}" class="btn btn-sm btn-outline-secondary">
                  View all this category masters
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
        `;
    }

    return `
<div class="album py-5 bg-body-tertiary">
  <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        ${html}
    </div>
  </div>
</div>   
    `;
  }

  main() {
    let category = "";

    if (this.req?.params?.category) {
      category = this.req.params.category;
    }

    const title = category
      ? category[0].toUpperCase() + category.slice(1)
      : "All masters";

    return `
    <main>
      <div class="container">
         <div class="row">
             <div class="col-12">
                 <h1 class="display-1">${title}</h1>
             </div>
         </div>
       </div>
       ${this.masters(category)};
     </main>
    `;
  }
}
