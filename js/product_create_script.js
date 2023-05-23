function create_product(){
    const nome = document.getElementById('Nome').value;
    const descricao = document.getElementById('Descricao').value;
    const preco = document.getElementById('Preco').value;
    const imagem = document.getElementById('Imagem').value;
    const categoria = document.getElementById('categoria').value
    const material = document.getElementById('material').value
    const color = document.getElementById('color').value
    const token = getCookie('token');

    if (nome === '' || descricao === '' || preco === '' || imagem === '' || categoria === '' || material === '' || color === '') {
        document.getElementById('signup-error').innerHTML = "Campos incompletos";
    }
    else {
        axios.post("https://localhost:7150/Product/Create", {
            id: "",
            name: nome,
            description: descricao,
            price: preco,
            stock: 1,
            image: imagem,
            categoryName: categoria,
            material: material,
            color: color
          }, {
            headers: {
              Authorization: "Bearer " + token
            }
          })
            .then(function (response) {
              window.location.href = "home.html";
            })
            .catch(function (error) {
              const responseData = error.response.data;
              if (responseData.errors) {
                const firstErrorKey = Object.keys(responseData.errors)[0];
                const firstError = responseData.errors[firstErrorKey][0];
                document.getElementById('signup-error').innerHTML = firstError;
              }
            });
          
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


function verifyRole(){
    if(!checkAdminRole()){
        window.location.href = "home.html";
    }
}



function checkAdminRole() {
    return checkCookieValue("role", "Admin");
}
  
  function checkCookieValue(cookieName, expectedValue) {
    var cookies = document.cookie.split(";");
  
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + "=")) {
        var value = cookie.substring(cookieName.length + 1);
        return value === expectedValue;
      }
    }
  
    return false;
  }



function checkCookieExists(cookieName) {
    var cookies = document.cookie.split(";");
  
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + "=")) {
        return true;
      }
    }
  
    return false;
  }
  