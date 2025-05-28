import { getAllMasters } from "../../db/public/masters.js";
import { PageTemplate } from "../../templates/PageTemplate.js";

export class PageMasters extends PageTemplate {
  constructor(req) {
    super(req);
    this.activeMenuIndex = 1;
    this.pageJS = "masters-like";
  }

  async masters(category) {
    let html = "";

    const mastersData = await getAllMasters();

    for (const master of mastersData) {
      if (master.url_slug === category || category === "")
        html += `
      <div class="col">
        <div class="card shadow-sm">
          <div class="photo">
            <img class="bd-placeholder-img card-img-top" src="/img/${master.img}" alt="Photo" />
            <div class="like-count">0</div>
            <i class="click-heart fa fa-heart" aria-hidden="true"></i>
          </div>
          <div class="card-body">
            <h4 class="card-text">${master.name} ${master.lastName}</h4>
            <p class="card-text">Category: ${master.category}</p>
            <p class="card-text">Workshop: ${master.workshop}, ${master.city}</p>
            <p class="card-text">Experience: ${master.experience}</p>

            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a href="/masters/${master.url_slug}" class="btn btn-sm btn-outline-secondary">
                  View all ${master.category}'s
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

  async main() {
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
       ${await this.masters(category)};
     </main>
    `;
  }
}
