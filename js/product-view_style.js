function setDefault() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  axios
    .get("https://localhost:7150/Product/GetById/" + productId)
    .then(function (response) {
      const product = response.data;
      const image = product.image;
      const title = product.name;
      const descricao = product.description;
      const price = product.price;
      const stock = product.stock;
      const category = product.categoryName;
      const material = product.material;
      const color = product.color;

      document.getElementById("img-product-view").src = image;
      document.getElementById("input-titulo").value = title;
      document.getElementById("input-descricao").value = descricao;
      document.getElementById("input-preco").value = price;
      document.getElementById("input-estoque").value = stock;
      document.getElementById("input-categoria").value = category;
      document.getElementById("input-material").value = material;
      document.getElementById("input-cor").value = color;
      // Verificar se o usuário é admin e habilitar os campos de edição
      const isAdmin = checkAdminRole();
      const inputFields = document.querySelectorAll("input, select");
      inputFields.forEach(function (input) {
        input.disabled = !isAdmin;
      });

      const descricaoTextarea = document.getElementById("input-descricao");
      if (isAdmin) {
        descricaoTextarea.removeAttribute("disabled");
      } else {
        descricaoTextarea.setAttribute("disabled", "disabled");
      }
      // Esconder ou mostrar os botões com base no tipo de usuário
      const cartButton = document.getElementById("cart-button");
      const updateButton = document.getElementById("update-button");
      if (isAdmin) {
        cartButton.style.display = "none";
        updateButton.style.display = "block";
      } else {
        cartButton.style.display = "block";
        updateButton.style.display = "none";
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}



function checkAdminRole() {
  const role = getCookie("role");
  return role === "Admin";
}

function updateProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const name = document.getElementById("input-titulo").value;
  const description = document.getElementById("input-descricao").value;
  const price = document.getElementById("input-preco").value;
  const stock = document.getElementById("input-estoque").value;
  const category = document.getElementById("input-categoria").value;
  const material = document.getElementById("input-material").value;
  const color = document.getElementById("input-cor").value;
  const image = document.getElementById("img-product-view").src;
  const token = getCookie("token");

  if (checkAdminRole()) {
    const updatedProduct = {
      id: productId,
      name: name,
      description: description,
      price: parseFloat(price),
      stock: parseInt(stock),
      categoryName: category,
      material: material,
      color: color,
      image: image
    };

    axios.put("https://localhost:7150/Product/Update", updatedProduct, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        alert("Produto atualizado com sucesso");
        // Redirecionar para a página de produtos
        window.location.href = "products.html";
      })
      .catch(function (error) {
        console.error(error);
        alert("Erro ao atualizar o produto");
      });
  } else {
    alert("Apenas administradores podem atualizar produtos.");
  }
}


function addToCart() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const userId = getCookie("id");
  const token = getCookie("token");

  if (token) {
    axios.put("https://localhost:7150/Cart/AddItem", {
        userID: userId,
        productId: productId
      }, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(function (response) {
        alert("Produto adicionado ao carrinho com sucesso");
        // Redirecionar para a página de produtos
        window.location.href = "products.html";
      })
      .catch(function (error) {
        const responseData = error.response.data;
        if (responseData.errors) {
          const firstErrorKey = Object.keys(responseData.errors)[0];
          const firstError = responseData.errors[firstErrorKey][0];
          alert(firstError);
        } else {
          alert("Produto Indisponível");
        }
      });
  } else {
    alert("Você precisa estar logado para adicionar um item ao carrinho");
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

window.onload = function () {
  setDefault();
};
