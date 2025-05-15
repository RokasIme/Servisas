import { mastersData } from "../data/masters.js";
import { workshopsData } from "../data/workshops.js";
import { PageTemplate } from "../templates/PageTemplate.js";

export class PageWorshops extends PageTemplate {
  constructor(req) {
    super(req);
    this.activeMenuIndex = 2;
    this.pageJS = "masters-like";
  }

  workshops() {
    let html = "";
    const category = "";

    for (let i = 0; i < workshopsData.length; i++) {
      html += `<section class="text-center container">
    <div class="row ">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">${workshopsData[i].service}</h1>
        <p class="lead text-body-secondary">${workshopsData[i].city}, ${workshopsData[i].adress}</p>
      </div>
    </div>
  </section>
  
  <div class="album py-5 bg-body-tertiary">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
  
        `;

      for (const master of mastersData) {
        if (master.service === workshopsData[i].service) {
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
      }
      html += `
            </div>
        </div>
    </div>`;
    }
    return html;
  }

  main() {
    return `
    <main>
        ${this.workshops()}
    </main>`;
  }
}
