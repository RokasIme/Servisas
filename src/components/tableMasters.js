import { Badge } from "./Badge.js";

export function tableMasters(data) {
  let HTML = "";

  for (const item of data) {
    const desc = item.description
      ? Badge.success("Provided")
      : Badge.danger("Missing");
    const status = item.is_published
      ? Badge.success("Published")
      : Badge.warning("Draft");

    HTML += `
            <tr>
                <td>${item.id}</td>
                <td><img style="max-width: 5rem; max-height: 5rem;" src="/img/${item.img}" alt="Master thumbnail"></td>
                <td>${item.name}</td>
                <td>${item.lastName}</td>
                <td>${item.url_slug}</td>
                <td>${desc}</td>
                <td>${item.experience}</td>
                <td>${status}</td>
                <td>
                    <div style="display: flex; gap: 0.3rem;">
                        <a class="btn btn-primary" href="/admin/masters/${item.id}/edit">Edit</a>
                        <button data-id="${item.id}" class="btn btn-danger" type="button">Delete</button>
                    </div>
                </td>
            </tr>`;
  }

  return `
        <div class="table-responsive small">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Thumbnail</th>
                        <th scope="col">Name</th>
                        <th scope="col">LastName</th>
                        <th scope="col">Url</th>
                        <th scope="col">Description</th>
                        <th scope="col">Experience</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>${HTML}</tbody>
            </table>
        </div>`;
}
