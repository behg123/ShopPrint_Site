function changeLayout() {
  var cookieName = "token";
  var cookieExists = checkCookieExists(cookieName);

  var cookieRole = "role";
  var cookieRoleExists = checkCookieExists(cookieRole); // Corrigido o nome do cookie

  var cookieId = "id";
  var cookieIdExists = checkCookieExists(cookieId); // Corrigido o nome do cookie

  var searchInput = document.getElementById("search-bar");
  var searchIcon = document.getElementById("search-icon");

  function performSearch() {
    var searchTerm = searchInput.value;
    window.location.href = "search_results.html?query=" + searchTerm;
  }

  searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchProducts();
    }
  });

  searchIcon.addEventListener("click", function() {
    searchProducts();
  });

  if (cookieExists) {
    var dropdownContent = document.querySelector(".dropdown-content");

    var loginRedirect = document.getElementById("login-redirect");
    var signupRedirect = document.getElementById("signup-redirect");

    loginRedirect.textContent = "Editar Conta";
    loginRedirect.href = "edit-account.html";

    signupRedirect.textContent = "Sign Off";
    signupRedirect.href = "home.html";
    signupRedirect.addEventListener("click", function() {
      deleteCookie(cookieName);
      deleteCookie(cookieRole);
      deleteCookie(cookieId);
    });

    if (checkAdminRole()) {
      var newLoginRedirect = document.createElement("a");
      newLoginRedirect.id = "new-login-redirect";
      newLoginRedirect.href = "product-create.html";
      newLoginRedirect.className = "login-box";
      newLoginRedirect.innerText = "Criar Item";
      newLoginRedirect.style.left = "90px";
      newLoginRedirect.style.top = "285px";
      newLoginRedirect.style.width = "240px";
      newLoginRedirect.style.backgroundColor = "#FFFFFF";
      dropdownContent.appendChild(newLoginRedirect);
    }
  } else {
    var cart = document.getElementById("cart-icon");
    cart.style.display = "none";
  }
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

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function searchProducts() {
  
  const searchInput = document.getElementById("search-bar").value;
  axios.get("https://localhost:7150/Product/GetByName/" + searchInput)
    .then(function(response) {
      const products = response.data.id;

      if (products.length > 0) {
        window.location.href = "products.html?id=" + products; // Passar o ID como parâmetro na URL
      } else {
        console.log("Nenhum produto encontrado.");
      }
    })
    .catch(function(error) {
      console.error(error);
    });
}
