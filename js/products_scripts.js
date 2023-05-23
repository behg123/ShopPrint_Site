function load_images() {
    axios.get('https://localhost:7150/Product/GetAll')
      .then(function (response) {
        const products = response.data;
        const wrapper = document.getElementById("product-list");
  
        products.forEach(function (product, index) {
          const { id, name, description, price, image } = product;
  
          const newDiv = document.createElement("div");
          const newImage = document.createElement("img");
          const newTitle = document.createElement('div');
          const newPrice = document.createElement('div');
  
          newDiv.id = "product-" + id;
          newImage.id = "product-img-" + id;
  
          newTitle.style.fontFamily = 'Roboto';
          newTitle.style.fontStyle = 'normal';
          newTitle.style.fontWeight = '900';
          newTitle.style.fontSize = '32px';
          newTitle.style.margin = '0 0 0 10px';
          newTitle.innerHTML = name;
  
          newDiv.style.width = "400px";
          newDiv.style.height = "400px";
          newDiv.style.background = "white";
          newDiv.style.marginBottom = "100px";
          newDiv.onclick = function () { getId(id, image, newTitle.innerHTML) };
  
          newPrice.style.fontFamily = 'Roboto';
          newPrice.style.fontStyle = 'normal';
          newPrice.style.fontWeight = '900';
          newPrice.style.fontSize = '18px';
          newPrice.style.margin = '10px 0 0 10px';
          newPrice.innerHTML = "R$ " + price;
  
          newImage.style.padding = "7px";
          newImage.style.height = "255px";
          newImage.style.width = "385px";
          newImage.src = image;
          newDiv.appendChild(newImage);
          newDiv.appendChild(newTitle);
          newDiv.appendChild(newPrice);
  
          wrapper.appendChild(newDiv);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  

function filterProducts() {
    const material = document.getElementById("material-select").value;
    const color = document.getElementById("color-select").value;
    const minPrice = document.getElementById("filter-min").value;
    const maxPrice = document.getElementById("filter-max").value;

    const filterParams = {
      material: material,
      color: color,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };

    axios
      .post("https://localhost:7150/Product/Filter", 
      {
    minValue: minPrice,
    maxValue: maxPrice,
    category: [
        "Peca"
    ],
    "color": [
        "string"
    ],
    "material": [
        "string"
    ]
})
      .then(function (response) {
        const products = response.data;
        wrapper.innerHTML = "";

        products.forEach(function (product, index) {
            const { id, name, description, price, image } = product;
  
            const newDiv = document.createElement("div");
            const newImage = document.createElement("img");
            const newTitle = document.createElement('div');
            const newPrice = document.createElement('div');
    
            newDiv.id = "product-" + id;
            newImage.id = "product-img-" + id;
    
            newTitle.style.fontFamily = 'Roboto';
            newTitle.style.fontStyle = 'normal';
            newTitle.style.fontWeight = '900';
            newTitle.style.fontSize = '32px';
            newTitle.style.margin = '0 0 0 10px';
            newTitle.innerHTML = name;
    
            newDiv.style.width = "400px";
            newDiv.style.height = "400px";
            newDiv.style.background = "white";
            newDiv.style.marginBottom = "100px";
            newDiv.onclick = function () { getId(id, image, newTitle.innerHTML) };
    
            newPrice.style.fontFamily = 'Roboto';
            newPrice.style.fontStyle = 'normal';
            newPrice.style.fontWeight = '900';
            newPrice.style.fontSize = '18px';
            newPrice.style.margin = '10px 0 0 10px';
            newPrice.innerHTML = "R$ " + price;
    
            newImage.style.padding = "7px";
            newImage.style.height = "255px";
            newImage.style.width = "385px";
            newImage.src = image;
            newDiv.appendChild(newImage);
            newDiv.appendChild(newTitle);
            newDiv.appendChild(newPrice);
    
            wrapper.appendChild(newDiv);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
