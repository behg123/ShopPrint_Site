function cartItems() {
    const idUser = getCookie('id');
    const token = getCookie('token');
  
    axios.get("https://localhost:7150/Cart/GetByUserId/" + idUser, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(function (response) {
            const cartItemsData = response.data.items;
            addItem(cartItemsData, idUser);
        })
        .catch(function (error) {
            const wrapper = document.getElementById("cart-list");
            wrapper.innerHTML = "";
            wrapper.classList.add("empty-cart");
  
            const newDiv = document.createElement("div");
            newDiv.textContent = "Parece que seu carrinho está vazio :(";
            newDiv.classList.add("empty-message");
  
            const imageElement = document.createElement("img");
            imageElement.src = "/image/empty-icon.png";
            imageElement.classList.add("empty-icon");
  
            wrapper.appendChild(imageElement);
            wrapper.appendChild(newDiv);
        });
  }
  

function createDiv(className) {
    const div = document.createElement("div");
    div.classList.add(className);
    return div;
  }
  
  function createImage(src, alt, className) {
    const image = document.createElement("img");
    image.src = src;
    image.alt = alt;
    image.classList.add(className);
    return image;
  }
  
  function createButton(className, text, clickHandler) {
    const button = document.createElement("button");
    button.classList.add(className);
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
  }
  
  function addItem(items) {
    const wrapper = document.getElementById("cart-list");
  
    for (let i = 0; i < items.length; i++) {
      const item = items[i].product;
      const image = item.image;
      const newDiv = createDiv("cart-item");
  
      const newImage = createImage(image, `Product Image ${i}`, "cart-item-image");
  
      const newTitle = createDiv("cart-item-title");
      newTitle.textContent = item.name;
  
      const newPrice = createDiv("cart-item-price");
      newPrice.textContent = `R$${item.price}`;
  
      const newAddButton = createButton("add-button", "+", function () {
        addQuantity(item.id);
      });
  
      const newQuantity = createDiv("cart-item-quantity");
      newQuantity.textContent = items[i].quantity;
      newQuantity.id = `quantity${item.id}`;
  
      const newRemoveButton = createButton("remove-button", "-", function () {
        removeQuantity(item.id);
      });
  
      const newRemoveItem = createButton("remove-item", "Remove", function () {
        removeItem(item.id);
      });
  
      newDiv.appendChild(newImage);
      newDiv.appendChild(newTitle);
      newDiv.appendChild(newPrice);
      newDiv.appendChild(newAddButton);
      newDiv.appendChild(newQuantity);
      newDiv.appendChild(newRemoveButton);
      newDiv.appendChild(newRemoveItem);
  
      wrapper.appendChild(newDiv);
    }
  }
  

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}


function addQuantity(idProduto) {
    const token = getCookie('token');
    const idUser = getCookie('id');

    axios.put("https://localhost:7150/Cart/AddItem/", {
        UserId: idUser,
        ProductId: idProduto
    }, {
        headers: {
            Authorization: "Bearer " + token
        }
    })

        .then(function (response) {
            location.reload();
        })
        .catch(function (error) {
            alert(error);
        });
}


function removeQuantity(idProduto) {
    const token = getCookie('token');
    const idUser = getCookie('id');

    axios.put("https://localhost:7150/Cart/RemoveItem/", {
        UserId: idUser,
        ProductId: idProduto
    }, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
        .then(function (response) {
            location.reload();
                })
        .catch(function (error) {
            alert(error);
        });
}


function removeItem(idProduto) {
    const token = getCookie('token');
    const idUser = getCookie('id');

    axios.put("https://localhost:7150/Cart/RemoveProduct/", {
        UserId: idUser,
        ProductId: idProduto
    }, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
        .then(function (response) {
            location.reload();
                })
        .catch(function (error) {
            alert(error);
        });
}



