import { tableWorkshops } from "../../components/tableWorkshops.js";
import { getAllworkshops } from "../../db/admin/workshops.js";
import { AdminPageTemplate } from "../../templates/AdminPageTemplate.js";

export class PageAdminWorkshops extends AdminPageTemplate {
  constructor(req) {
    super(req);
    this.activeMenuIndex = this.req.user.isLoggedIn ? 3 : -1;
    // this.pageJS = "admin-category-delete";
  }

  async main() {
    const data = await getAllworkshops();

    return `
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2">All workshops</h1>
                ${tableWorkshops(data)}
            </main>`;
  }
}
