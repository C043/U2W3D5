const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZWQyNjdjMjM5YzAwMTUyZjRiMmUiLCJpYXQiOjE3MTgzNDkwOTQsImV4cCI6MTcxOTU1ODY5NH0.N3Flx4mviicHWEEUPctAlNT9G37TkJZPSjg7kbKKxNM";

const form = document.querySelector("form");
const alertContainer = document.getElementById("alert-container");
const params = new URLSearchParams(window.location.search);
const id = params.get("productId");
const resetBtn = document.getElementById("reset-btn");
resetBtn.onclick = () => {
  const hasConfirmed = confirm(`Sicuro di voler resettare il form?`);
  if (hasConfirmed) {
    form.reset();
  }
};

const alertGen = (color, message) => {
  const div = document.createElement("div");
  div.className = `alert alert-${color} fade-in mt-2`;
  div.role = "alert";
  div.innerText = message;

  return div;
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

    const navBarItem = document.getElementById("navbar-item-page");
    navBarItem.innerText = "Edit Product";

    fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw resp.status;
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
      .catch(err => {
        const main = document.querySelector("main");
        main.innerHTML = "";
        main.classList.add("d-flex", "justify-content-center");
        const src = "https://http.cat/" + err;
        const img = document.createElement("img");
        img.style.height = "500px";
        img.style.width = "700px";
        img.src = src;

        main.appendChild(img);
      });
  }
});

const deleteProduct = () => {
  const hasConfirmed = confirm(`Sicuro di voler eliminare il prodotto?`);
  if (hasConfirmed) {
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: apiKey,
      },
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw resp.status;
        }
      })
      .then(deletedProduct => {
        alert(`Prodotto ${deletedProduct.name} eliminato con successo`);
        window.location.assign("/");
      })
      .catch(err => {
        const src = "https://http.cat/" + err;
        const img = document.createElement("img");
        img.style.height = "500px";
        img.style.width = "700px";
        img.src = src;

        const modalTitle = document.getElementById("errorModalLabel");
        modalTitle.innerText = err;

        const modalImg = document.getElementById("errorModalImg");
        modalImg.src = src;
        document.getElementById("modal-trigger").click();

        main.appendChild(img);
      });
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
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw resp.status;
      }
    })
    .then(addedProduct => {
      if (method === "PUT") {
        alert(`Prodotto ${addedProduct.name} modificato con successo!`);
        window.location.assign("/");
      } else {
        alertContainer.innerHTML = "";
        alertContainer.appendChild(alertGen("success", `Prodotto ${addedProduct.name} aggiunto con successo`));
        form.reset();
        setTimeout(() => {
          const alert = document.querySelector(".alert");
          alert.classList.remove("fade-in");
          alert.classList.add("fade-out");
        }, 3000);
      }
    })
    .catch(err => {
      /*       const main = document.querySelector("main");
      main.innerHTML = "";
      main.classList.add("d-flex", "justify-content-center");
 */ const src = "https://http.cat/" + err;
      const img = document.createElement("img");
      img.style.height = "500px";
      img.style.width = "700px";
      img.src = src;

      const modalTitle = document.getElementById("errorModalLabel");
      modalTitle.innerText = err;

      const modalImg = document.getElementById("errorModalImg");
      modalImg.src = src;
      document.getElementById("modal-trigger").click();

      main.appendChild(img);
    });
};
