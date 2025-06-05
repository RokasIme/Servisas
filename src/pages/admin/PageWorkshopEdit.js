import { getAllworkshopById } from "../../db/admin/workshops.js";
import { AdminPageTemplate } from "../../templates/AdminPageTemplate.js";

export class PageAdminWorkshopEdit extends AdminPageTemplate {
  constructor(req) {
    super(req);
    this.activeMenuIndex = this.req.user.isLoggedIn ? 3 : -1;
    this.pageJS = "admin-workshop";
  }

  async main() {
    const data = await getAllworkshopById(this.req.params.id);

    if (!data) {
      return `
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <h1 class="h2">Toks servisas neegzistuoja</h1>
        </main>`;
    }

    return `
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2">Edit Workshop: ${data.workshop}</h1>
                <form action="/api/admin/workshops/${data.id}" data-method="PUT" class="needs-validation col-12 col-md-10 col-lg-8 col-xl-6">
                    <div class="row g-3">
                        <div class="col-sm-12">
                            <label for="name" class="form-label">Workshop name</label>
                            <input type="text" class="form-control" id="name" placeholder="" value="${data.workshop}" required>
                            <div class="invalid-feedback">
                                Valid name is required.
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <label for="city" class="form-label">City</label>
                            <input type="text" class="form-control" id="city" placeholder="" value="${data.city}" required>
                            <div class="invalid-feedback">
                                Valid city is required.
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <label for="adress" class="form-label">Adress</label>
                            <input type="text" class="form-control" id="adress" placeholder="" value="${data.adress}" required>
                            <div class="invalid-feedback">
                                Valid adress is required.
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
