function createProductDiv(product) {
  const { id, name, price, image } = product;

  const newDiv = document.createElement("div");
  const newImage = document.createElement("img");
  const newTitle = document.createElement("div");
  const newPrice = document.createElement("div");

  newDiv.id = "product-" + id;
  newImage.id = "product-img-" + id;

  newTitle.classList.add("product-title");
  newTitle.innerHTML = name;

  newDiv.classList.add("product");
  newDiv.onclick = function () {
    getId(id, image, newTitle.innerHTML);
  };
  newDiv.setAttribute("data-id", id);

  newPrice.classList.add("product-price");
  newPrice.innerHTML = "R$ " + price;

  newImage.classList.add("product-img");
  newImage.src = image;
  newDiv.appendChild(newImage);
  newDiv.appendChild(newTitle);
  newDiv.appendChild(newPrice);

  return newDiv;
}

function load_images() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  if (productId) {
    axios.get("https://localhost:7150/Product/GetById/" + productId)
      .then(function(response) {
        const product = response.data;
        const wrapper = document.getElementById("product-list");
        wrapper.innerHTML = ""; // Limpar os itens anteriores antes de carregar novos

        const newDiv = createProductDiv(product);
        wrapper.appendChild(newDiv);
      })
      .catch(function(error) {
        console.error(error);
      });
  } else {
    axios
      .get("https://localhost:7150/Product/GetAll")
      .then(function (response) {
        const products = response.data;
        const wrapper = document.getElementById("product-list");
        wrapper.innerHTML = ""; // Limpar os itens anteriores antes de carregar novos

        products.forEach(function (product, index) {
          const newDiv = createProductDiv(product);
          wrapper.appendChild(newDiv);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

function filterProducts() {
  const material = document.getElementById("material-select").value;
  const color = document.getElementById("color-select").value;
  const minPrice = document.getElementById("filter-min").value;
  const maxPrice = document.getElementById("filter-max").value;

  const filterParams = {
    minValue: minPrice,
    maxValue: maxPrice,
    category: [],
    color: [color],
    material: [material],
  };

  axios
    .post("https://localhost:7150/Product/Filter", filterParams)
    .then(function (response) {
      const products = response.data;
      const wrapper = document.getElementById("product-list");
      wrapper.innerHTML = "";

      products.forEach(function (product, index) {
        const newDiv = createProductDiv(product);
        wrapper.appendChild(newDiv);
      });
    })
    .catch(function (error) {
      console.error(error);
    });
}
