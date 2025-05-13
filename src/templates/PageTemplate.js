export class PageTemplate {
  constructor() {
    this.activeMenuIndex = -1;
    this.pageJS = "";
  }

  head() {
    return `
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Servisas</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="stylesheet" href="/css/bootstrap.min.css">
    </head>`;
  }

  header() {
    const userIsLoggedIn = false;

    const publicMenu = [
      { href: "/", text: "Home" },
      { href: "/masters", text: "Masters" },
      { href: "/workshops", text: "Workshops" },
    ];

    const authMenu = [
      { href: "/login", text: "Login" },
      { href: "/register", text: "Register" },
    ];

    const userMenu = [
      { href: "/new-service", text: "New Service" },
      { href: "/edit-service", text: "Edit Service" },
      { href: "/edit-master", text: "Edit Master" },
      { href: "/dashboard", text: "Dashboard" },
      { href: "/logout", text: "Logout" },
    ];
    const menu = publicMenu.concat(userIsLoggedIn ? userMenu : authMenu);

    let menuHTML = "";

    for (let i = 0; i < menu.length; i++) {
      const link = menu[i];
      const active = i === this.activeMenuIndex ? "active" : "";
      const ariaCurrent =
        i === this.activeMenuIndex ? 'aria-current="page"' : "";
      menuHTML += `
              <li class="nav-item">
                  <a href="${link.href}" class="nav-link px-2 ${active}" ${ariaCurrent}>${link.text}</a>
              </li>`;
    }

    return ` 
  <div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <img class="bi me-2 ms-2" width="40" height="32" src="/img/home.jfif" alt="Home">
      </a>

      <ul class="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        ${menuHTML}
      </ul>
    </header>
  </div>`;
  }

  main() {
    return "<main>DEMO CONTENT</main>";
  }

  script() {
    if (this.pageJS) {
      return `<script src="/js/${this.pageJS}.js"></script>`;
    } else {
      return "";
    }
  }

  render() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    ${this.head()}
    <body>
    ${this.header()}
    ${this.main()}
    ${this.script()}
    </body>
    </html>
    
    `;
  }
}
