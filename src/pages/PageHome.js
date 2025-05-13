import { PageTemplate } from "../templates/PageTemplate.js";

export class PageHome extends PageTemplate {
  constructor(req) {
    super(req);
    this.activeMenuIndex = 0;
    this.pageJS = "login";
  }
  signForm() {
    return `
   <div class="container">
    <div class="row">
      <div class="col-lg-7 text-center text-lg-start">
        <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3">
          Vartojas nėra autentifikuotas
        </h1>
        <p class="col-lg-10 fs-4">
          Žemiau matoma informacija yra viešai prienama, jei norite redaguoti duomenis prašome prisijungti prie sistemos
        </p>
      </div>
      <div class="col-md-10 ms-auto col-lg-5">
      <div id="error" class="alert alert-danger d-none" role="alert">
        A simple danger alert—check it out!
      </div>
        <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="name@example.com"
            />
            <label for="email">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
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
  </div>`;
  }

  main() {
    return `
    ${this.signForm()}`;
  }
}
