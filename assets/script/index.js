const cardSpace = document.getElementById("card-space");

const singleCardGen = (id, name, description, brand, image, price) => {
  const col = document.createElement("div");
  col.className = "col-md-4";

  const card = document.createElement("div");
  card.className = "card mb-4 shadow-sm";

  const img = document.createElement("img");
  img.src = image;
  img.alt = name;
  img.setAttribute("role", "button");

  img.onclick = function () {
    window.location.replace("/details.html?productId=" + id);
  };

  const body = document.createElement("div");
  body.className = "card-body";

  const h5 = document.createElement("h5");
  h5.className = "card-title pointer line-clamp h4";
  h5.innerText = name;
  h5.setAttribute("role", "button");
  h5.onclick = function () {
    window.location.replace("/details.html?productId=" + id);
  };

  const des = document.createElement("p");
  des.className = "card-text";
  des.innerText = description;

  const shop = document.createElement("p");
  shop.className = "card-text h6";
  shop.innerText = brand;

  const flexContainer = document.createElement("div");
  flexContainer.className = "d-flex justify-content-between align-items-center";

  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";

  const hideBtn = document.createElement("button");
  hideBtn.className = "btn btn-sm btn-outline-danger";
  hideBtn.innerText = "Hide";
  hideBtn.type = "button";

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-outline-secondary";
  editBtn.innerText = "View";
  editBtn.type = "button";

  const small = document.createElement("small");
  small.className = "text-muted";
  small.innerText = price + "€";

  btnGroup.append(hideBtn, editBtn);
  flexContainer.append(btnGroup, small);
  body.append(h5, shop, des, flexContainer);
  card.append(img, body);
  col.append(card);
  cardSpace.append(col);
};

const get = url => {
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
        throw new Error("Problema con il reperimento dati");
      }
    })
    .then(products => {
      products.forEach(product => {
        const { _id, name, description, brand, imageUrl, price } = product;
        singleCardGen(_id, name, description, brand, imageUrl, price);
      });
    })
    .catch(err => console.log(err));
};

const cardGen = () => {
  const url = "https://striveschool-api.herokuapp.com/api/product/";
  get(url);
};

window.addEventListener("DOMContentLoaded", cardGen);
