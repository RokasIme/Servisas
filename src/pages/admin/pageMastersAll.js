import { tableMasters } from "../../components/tableMasters.js";
import { getAllMasters } from "../../db/admin/masters.js";
import { AdminPageTemplate } from "../../templates/AdminPageTemplate.js";

export class PageAdminMasters extends AdminPageTemplate {
  constructor(req) {
    super(req);
    this.activeMenuIndex = this.req.user.isLoggedIn ? 3 : -1;
  }

  async main() {
    const data = await getAllMasters();

    return `
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2">All masters</h1>
                ${tableMasters(data)}
            </main>`;
  }
}
