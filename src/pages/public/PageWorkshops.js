import { PageTemplate } from "../../templates/PageTemplate.js";
import { getWorkShops, getMastersByWorkshop } from "../../db/public/masters.js";

export class PageWorshops extends PageTemplate {
  constructor(req) {
    super(req);
    this.activeMenuIndex = 2;
    this.pageJS = "masters-like";
  }

  async workshops() {
    const workshops = await getWorkShops();

    let html = "";

    for (let i = 0; i < workshops.length; i++) {
      html += `<section class="text-center container">
    <div class="row ">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">${workshops[i].workshop}</h1>
        <p class="lead text-body-secondary">${workshops[i].city}, ${workshops[i].adress}</p>
      </div>
    </div>
  </section>
  
  <div class="album py-5 bg-body-tertiary">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
  
        `;

      const mastersByWorkshop = await getMastersByWorkshop(
        workshops[i].workshop
      );

      for (const master of mastersByWorkshop) {
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
      html += `
            </div>
        </div>
    </div>`;
    }
    return html;
  }

  async main() {
    return `
    <main>
        ${await this.workshops()}
    </main>`;
  }
}
