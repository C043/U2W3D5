const form = document.querySelector("form");

form.onsubmit = ev => {
  ev.preventDefault();
  const values = {
    name: document.getElementById("input-name").value,
    description: document.getElementById("input-description").value,
    imageUrl: document.getElementById("input-img").value,
    price: document.getElementById("input-price").value,
    brand: document.getElementById("input-brand").value,
  };
  const url = "https://striveschool-api.herokuapp.com/api/product/";
  fetch(url, {
    method: "POST",
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
      alert(`Prodotto ${addedProduct.name} aggiunto con successo!`);
      form.reset();
    })
    .catch(err => console.log(err));
};
