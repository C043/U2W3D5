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
    .then(product => {
      const { _id, name, description, brand, imageUrl, price } = product;
      img.src = imageUrl;
      img.alt = name;
      prodName.innerText = name;
      shop.innerText = brand;
      des.innerText = description;
      prodPrice.innerText = price + "€";
    })
    .catch(err => console.log(err));
});
