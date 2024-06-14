const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZWQyNjdjMjM5YzAwMTUyZjRiMmUiLCJpYXQiOjE3MTgzNDkwOTQsImV4cCI6MTcxOTU1ODY5NH0.N3Flx4mviicHWEEUPctAlNT9G37TkJZPSjg7kbKKxNM";

const params = new URLSearchParams(window.location.search);
const id = params.get("productId");

window.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("product-img");
  const prodName = document.getElementById("product-name");
  const shop = document.getElementById("shop");
  const des = document.getElementById("description");
  const prodPrice = document.getElementById("price");
  const backBtn = document.getElementById("back");

  backBtn.onclick = () => {
    window.location.replace("./index.html");
  };

  const url = "https://striveschool-api.herokuapp.com/api/product/" + id;

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
      const { _id, name, description, brand, imageUrl, price } = product;
      img.src = imageUrl;
      img.alt = name;
      prodName.innerText = name;
      shop.innerText = brand;
      des.innerText = description;
      prodPrice.innerText = price + "€";
    })
    .catch(err => {
      const container = document.getElementById("container");
      container.innerHTML = "";
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
    });
});
