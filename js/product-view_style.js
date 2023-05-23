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
      document.getElementById("img-product-view").src = image;
      document.getElementById("titulo").innerHTML = title;
      document.getElementById("descricao").innerHTML = descricao;


    })
    .catch(function (error) {
      console.error(error);
    });
}

window.onload = function () {
  setDefault();
};


function addCart() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const userId = getCookie("id")
  const token = getCookie("token")

  alert(userId + " + " + productId)
  axios.put("https://localhost:7150/Cart/AddItem", {
    userID: userId,
    productId: productId
  }, {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(function (response) {
      
    })  
    .catch(function (error) {
      const responseData = error.response.data;
      if (responseData.errors) {
        const firstErrorKey = Object.keys(responseData.errors)[0];
        const firstError = responseData.errors[firstErrorKey][0];
        alert(firstError);
      }
    });
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