import { Badge } from "./Badge.js";

export function tableWorkshops(data) {
  let HTML = "";

  for (const item of data) {
    HTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.workshop}</td>
                <td>${item.city}</td>
                <td>${item.adress}</td>              
                <td>
                    <div style="display: flex; gap: 0.3rem;">
                        <a class="btn btn-primary" href="/admin/workshops/${item.id}/edit">Edit</a>
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
                        <th scope="col">Workshop</th>
                        <th scope="col">City</th>
                        <th scope="col">Adress</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>${HTML}</tbody>
            </table>
        </div>`;
}
