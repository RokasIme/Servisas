import { categoriesList } from "../../components/categoriesList.js";
import { PageTemplate } from "../../templates/PageTemplate.js";
// const homeLoginDOM = document.querySelector(".home-login-section");
// homeLoginDOM.classList.add("d-none");

export class PageHome extends PageTemplate {
  constructor(req) {
    super(req);
    this.activeMenuIndex = 0;
    this.pageJS = "login";
  }

  signForm() {
    const userIsLoggedIn = this.req.headers.cookie !== undefined;

    return userIsLoggedIn
      ? ""
      : `
   <div class="home-login-section container">
    <div class="row">
      <div class="col-lg-7 text-center text-lg-start">
        <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3">
          User is not logged in
        </h1>
        <p class="col-lg-10 fs-4">
          The information below is publicly available. If you wish to edit the data, please log in to the system.
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

  mastersCategory() {
    return `

<div class="container px-4 py-5" id="hanging-icons">
  <h2 class="pb-2 border-bottom">Masters by category</h2>
  <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
    ${categoriesList()}
  </div>
</div>
`;
  }

  viewAll() {
    return `
<main class="container">
  <div class="bg-body-tertiary p-5 rounded mt-3">
    <h1>More details:</h1>
    <p class="lead">
      If you want to see all available masters, view their ratings, rate a master, or browse all available workshops, click below:
    </p>
    <a class="btn btn-lg btn-primary" href="/masters" role="button"
      >View all masters
    </a>
    <a class="btn btn-lg btn-primary" href="/workshops" role="button"
      >View available workshops
    </a>
  </div>
</main>
  `;
  }

  main() {
    return `
    ${this.signForm()}
    ${this.mastersCategory()};
    ${this.viewAll()}`;
  }
}
