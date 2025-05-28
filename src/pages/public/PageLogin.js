import { NODE_ENV } from "../../env.js";
import { PageTemplate } from "../../templates/PageTemplate.js";

export class PageLogin extends PageTemplate {
  constructor(req) {
    super(req);
    this.pageJS = "login";
    this.activeMenuIndex = 3;
  }
  main() {
    const email = NODE_ENV === "dev" ? "rokas.imelinskas@gmail.com" : "";
    const password = NODE_ENV === "dev" ? "rokas.imelinskas@gmail.com" : "";

    return `
<main>
  <div class="container">
    <div class="row">
      <div class="col-md-10 mx-auto col-lg-5">
      <h1 class="display-1">Login</h1>
      <div id="error" class="alert alert-danger d-none" role="alert">
        A simple danger alert—check it out!
      </div>
        <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
          <div class="form-floating mb-3">
            <input
              type="email"
              value ="${email}"
              class="form-control"
              id="email"
              placeholder="name@example.com"
            />
            <label for="email">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              value ="${password}"
              class="form-control"
              id="password"
              placeholder="Password"
            />
            <label for="password">Password</label>
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit">Login</button>
          <hr class="my-4" />
          <small class="text-body-secondary"
            >By clicking Login, you agree to the terms of use.</small
          >
        </form>
      </div>
    </div>
  </div>
</main>`;
  }
}
