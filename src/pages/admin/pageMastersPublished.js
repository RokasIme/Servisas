import { tableMasters } from "../../components/tableMasters.js";
import { getAllMastersPublished } from "../../db/admin/masters.js";
import { AdminPageTemplate } from "../../templates/AdminPageTemplate.js";

export class PageAdminMastersPublished extends AdminPageTemplate {
  constructor(req) {
    super(req);
    this.activeMenuIndex = this.req.user.isLoggedIn ? 3 : -1;
    this.pageJS = "admin-master-delete";
  }

  async main() {
    const data = await getAllMastersPublished();

    return `
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2">Published masters</h1>
                ${tableMasters(data)}
            </main>`;
  }
}
