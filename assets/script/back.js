const form = document.querySelector("form");
const params = new URLSearchParams(window.location.search);
const id = params.get("productId");
const resetBtn = document.getElementById("reset-btn");
resetBtn.onclick = () => {
  const hasConfirmed = confirm(`Sicuro di voler resettare il form?`);
  if (hasConfirmed) {
    form.reset();
  }
};

const url = id
  ? "https://striveschool-api.herokuapp.com/api/product/" + id
  : "https://striveschool-api.herokuapp.com/api/product/";

window.addEventListener("DOMContentLoaded", () => {
  const values = {
    name: document.getElementById("input-name"),
    description: document.getElementById("input-description"),
    imageUrl: document.getElementById("input-img"),
    price: document.getElementById("input-price"),
    brand: document.getElementById("input-brand"),
  };

  if (id) {
    const h1 = document.querySelector("h1");
    h1.innerText = "Edit Product";

    fetch(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZWQyNjdjMjM5YzAwMTUyZjRiMmUiLCJpYXQiOjE3MTgzNDkwOTQsImV4cCI6MTcxOTU1ODY5NH0.N3Flx4mviicHWEEUPctAlNT9G37TkJZPSjg7kbKKxNM",
      },
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Operazione non riuscita");
        }
      })
      .then(product => {
        values.name.setAttribute("value", product.name);
        values.description.setAttribute("value", product.description);
        values.imageUrl.setAttribute("value", product.imageUrl);
        values.price.setAttribute("value", product.price);
        values.brand.setAttribute("value", product.brand);

        const formBtnSpace = document.getElementById("form-btn");
        formBtnSpace.innerHTML = "";

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-primary";
        editBtn.innerText = "Edit";
        editBtn.type = "submit";

        const delBtn = document.createElement("button");
        delBtn.className = "btn btn-outline-danger";
        delBtn.innerText = "Delete";
        delBtn.type = "button";

        delBtn.onclick = deleteProduct;

        formBtnSpace.append(editBtn, delBtn);
      })
      .catch(err => console.log(err));
  }
});

const deleteProduct = () => {
  const hasConfirmed = confirm(`Sicuro di voler eliminare il prodotto?`);
  if (hasConfirmed) {
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZWQyNjdjMjM5YzAwMTUyZjRiMmUiLCJpYXQiOjE3MTgzNDkwOTQsImV4cCI6MTcxOTU1ODY5NH0.N3Flx4mviicHWEEUPctAlNT9G37TkJZPSjg7kbKKxNM",
      },
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Operazione non riuscita");
        }
      })
      .then(deletedProduct => {
        alert(`Prodotto ${deletedProduct.name} eliminato con successo`);
        window.location.assign("/");
      })
      .catch(err => console.log(err));
  }
};

form.onsubmit = ev => {
  ev.preventDefault();
  const method = url === "https://striveschool-api.herokuapp.com/api/product/" + id ? "PUT" : "POST";

  const values = {
    name: document.getElementById("input-name").value,
    description: document.getElementById("input-description").value,
    imageUrl: document.getElementById("input-img").value,
    price: document.getElementById("input-price").value,
    brand: document.getElementById("input-brand").value,
  };
  fetch(url, {
    method,
    body: JSON.stringify(values),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZWQyNjdjMjM5YzAwMTUyZjRiMmUiLCJpYXQiOjE3MTgzNDkwOTQsImV4cCI6MTcxOTU1ODY5NH0.N3Flx4mviicHWEEUPctAlNT9G37TkJZPSjg7kbKKxNM",
      "Content-Type": "application/json",
    },
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Operazione non riuscita");
      }
    })
    .then(addedProduct => {
      if (method === "PUT") {
        alert(`Prodotto ${addedProduct.name} modificato con successo!`);
        window.location.assign("/");
      } else {
        alert(`Prodotto ${addedProduct.name} aggiunto con successo!`);
        form.reset();
      }
    })
    .catch(err => console.log(err));
};
