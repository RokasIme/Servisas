import { getAllCategories } from "../../db/admin/categories.js";
import { getMasterById } from "../../db/admin/masters.js";
import { getAllworkshops } from "../../db/admin/workshops.js";
import { AdminPageTemplate } from "../../templates/AdminPageTemplate.js";

export class PageAdminMasterEdit extends AdminPageTemplate {
  constructor(req) {
    super(req);
    this.activeMenuIndex = this.req.user.isLoggedIn ? 3 : -1;
    this.pageJS = "admin-master";
  }

  async main() {
    const data = await getMasterById(this.req.params.id);

    if (!data) {
      return `
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <h1 class="h2">Toks meistras neegzistuoja</h1>
                </main>`;
    }

    const categories = await getAllCategories();
    let categoriesHTML = `<option value="0" ${
      data.category_id === 0 ? "selected" : ""
    }>-- select category</option>`;
    for (const cat of categories) {
      categoriesHTML += `<option value="${cat.id}" ${
        data.category_id === cat.id ? "selected" : ""
      }>${cat.category}</option>`;
    }

    const workshops = await getAllworkshops();
    let workshopsHTML = `<option value="0" ${
      data.workshop_id === 0 ? "selected" : ""
    } >-- select workshop</option>`;
    for (const shop of workshops) {
      workshopsHTML += `<option value="${shop.id}" ${
        data.workshop_id === shop.id ? "selected" : ""
      }>${shop.workshop}</option>`;
    }

    const img = data.img ? `/img/${data.img}` : "/img/default.webp";

    return `
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2">Edit master: ${
                  data.name + " " + data.lastName
                }</h1>
                <form action="/api/admin/upload" data-method="POST" enctype="multipart/form-data" class="needs-validation col-12 col-md-10 col-lg-8 col-xl-6 mb-3">
                    <div class="row g-3">
                        <div class="col-12">
                            <label for="thumbnail" class="form-label">Thumbnail</label>
                            <input class="form-control" id="thumbnail" name="thumbnail" type="file" required>
                            <div class="invalid-feedback">
                                Valid image is required.
                            </div>
                        </div>
                        <img id="image" class="col-12" style="max-height: 20rem; object-fit: contain;" src="${img}" alt="">
                    </div>
                </form>
                <form action="/api/admin/masters/${
                  data.id
                }" data-method="PUT" class="needs-validation col-12 col-md-10 col-lg-8 col-xl-6">
                    <div class="row g-3">
                        <div class="col-sm-12">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" placeholder="" value="${
                              data.name
                            }" required>
                            <div class="invalid-feedback">
                                Valid first name is required.
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <label for="last_name" class="form-label">Last name</label>
                            <input type="text" class="form-control" id="last_name" placeholder="" value="${
                              data.lastName
                            }" required>
                            <div class="invalid-feedback">
                                Valid last name is required.
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <label for="category" class="form-label">Category</label>
                            <select class="form-control" id="category">${categoriesHTML}</select>
                            <div class="invalid-feedback">
                                Valid Category is required.
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <label for="Experience" class="form-label">Experience</label>
                            <input type="text" class="form-control" id="experience" placeholder="" value="${
                              data.experience
                            }" required>
                            <div class="invalid-feedback">
                                Valid years is required.
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <label for="workshop" class="form-label">Workshop</label>
                            <select class="form-control" id="workshop">${workshopsHTML}</select>
                        </div>
                        <div class="my-3">
                            <div class="form-check">
                                <input id="draft" value="draft" name="status" type="radio" class="form-check-input" checked required>
                                <label class="form-check-label" for="draft">Draft</label>
                            </div>
                            <div class="form-check">
                                <input id="publish" value="publish" name="status" type="radio" class="form-check-input" required>
                                <label class="form-check-label" for="publish">Publish</label>
                            </div>
                        </div>
                    </div>
                    <hr class="my-4">
                    <div class="d-flex" style="gap: 1rem;">
                        <button class="btn btn-success btn-lg" type="submit">Update</button>
                        <button class="btn btn-secondary btn-lg ms-auto" type="reset">Reset</button>
                    </div>
                </form>
            </main>`;
  }
}
