import { PageTemplate } from "../templates/PageTemplate.js";

export class PageRegister extends PageTemplate {
  main() {
    return `
<main>
  <div class="container">
    <div class="row">
      <div class="col-md-10 mx-auto col-lg-5">
        <h1 class="display-1">Register</h1>
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
          <div class="checkbox mb-3">
            <label> <input type="checkbox" value="remember-me" /> Agree with Terms of Service </label>
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
          <hr class="my-4" />
          <small class="text-body-secondary"
            >By clicking Register, you agree to the terms of use.</small
          >
        </form>
      </div>
    </div>
  </div>
</main>`;
  }
}
