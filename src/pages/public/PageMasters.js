import { getAllCategories } from "../../db/admin/categories.js";
import { getAllLikes, getHeartColor } from "../../db/admin/likes.js";
import { getAllworkshops } from "../../db/admin/workshops.js";
import { getAllMasters } from "../../db/public/masters.js";
import { PageTemplate } from "../../templates/PageTemplate.js";

export class PageMasters extends PageTemplate {
  constructor(req) {
    super(req);
    this.activeMenuIndex = 1;
    // this.pageJS = this.req.user.id ? "masters-like" : "";
    this.pageJS = "mastersFilter";
  }

  async masters(category) {
    let html = "";

    const mastersData = await getAllMasters();

    for (const master of mastersData) {
      const likesObj = await getAllLikes(master.id);
      let likes = likesObj[0].sum;
      likes === null ? (likes = 0) : likes;

      const user_id = this.req.user.id;
      const result = await getHeartColor(user_id, master.id);
      const like = +result[0]?.sum ? +result[0].sum : 0;

      if (master.url_slug === category || category === "")
        html += `
      <div class="col">
        <div class="card shadow-sm">
          <div class="photo">
            <img class="bd-placeholder-img card-img-top" src="/img/${
              master.img
            }" alt="Photo" />
            <div data-count="${master.id}" class="like-count">${likes}</div>
            <i data-push="${master.id}" class=" ${
          like === 1 ? "heart-color" : ""
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

    // gaunam visas kategorijas
    const categories = await getAllCategories();
    let catHTML = '<option value="0">All</option>';

    for (const cat of categories) {
      catHTML += `<option value="${cat.id}">${cat.category}</option>`;
    }

    // gaunam visus meistrus
    const mastersAll = await getAllMasters();
    let mastersHTML = '<option value="0">All</option>';

    for (const master of mastersAll) {
      mastersHTML += `<option value="${master.id}">${
        master.name + " " + master.lastName
      }</option>`;
    }

    // gaunam visus servisus
    const workshopsAll = await getAllworkshops();
    let workshopsHTML = '<option value="0">All</option>';

    for (const shop of workshopsAll) {
      workshopsHTML += `<option value= "${shop.id}">${shop.workshop}</option>`;
    }
    return `
    <main>
      <div class="container">
         <div class="row">
             <div class="col-12">
                 <h1 class="display-1">${title}</h1>
             </div>
         </div>
       </div>
        <div class="container mb-5">
            <form action="" class="row">
                <div class="col-12 col-lg-3">
                    <label>Text search</label>
                    <input class="form-control" type="text">
                </div>
                <div class="col-12 col-md-4 col-lg-3">
                    <label>Category</label>
                    <select class="form-control">${catHTML}</select>
                </div>
                <div class="col-12 col-md-4 col-lg-3">
                    <label>Masters full name</label>
                    <select class="form-control">
                       ${mastersHTML}
                    </select>
                </div>
                 <div class="col-12 col-md-4 col-lg-3">
                    <label>Workshop</label>
                    <select class="form-control">${workshopsHTML}             
                    </select>
                </div>
                <div class="col-12 mt-3">
                    <input class="form-check-input" type="checkbox">
                    <label>Only with thumbnails</label>
                </div>
            </form>
        </div>
       ${await this.masters(category)};
     </main>
    `;
  }
}
